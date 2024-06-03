import { Notice, Plugin } from 'obsidian';
import { HighlightModal } from './HighlightModal';
import path from 'path';

export default class HighlightSaver extends Plugin {
	onload(): void {
		this.addCommand({
			id: 'open-save-highlights-modal',
			name: 'Open Save Highlights Modal',
			callback: () => {
				const modal = new HighlightModal(this.app, () => this.saveHighlights());
				modal.open();
			},
		});
	}

	async saveHighlights(): Promise<void> {
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) {
			new Notice('No active file found.');
			return;
		}

		let fileContents: string;
		try {
			fileContents = await this.app.vault.read(activeFile);
		} catch (error) {
			new Notice('Error reading the file.');
			console.error(error);
			return;
		}

		const highlights = fileContents.match(/==([^=]+)==/g) || [];
		if (highlights.length === 0) {
			new Notice('No highlights found.');
			return;
		}

		const maxColumns = Math.max(...highlights.map(h => h.replace(/==/g, '').trim().split('|').length));

		const headers = '| ' + Array(maxColumns).fill('Column').join(' | ') + ' |\n';
		const separator = '| ' + Array(maxColumns).fill('---').join(' | ') + ' |\n';

		const originalFileName = activeFile.basename;
		const newFileName = activeFile.basename + '-highlights.md';
		const newFilePath = path.join(path.dirname(activeFile.path), newFileName);

		const tableContent = highlights.map((h, index) => {
			const parts = h.replace(/==/g, '').trim().split('|').map(part => part.trim());
			const paddedParts = parts.concat(Array(maxColumns - parts.length).fill(''));
			return `| ${paddedParts.join(' | ')} | [[${originalFileName}#highlight-${index + 1}]]`;
		}).join('\n');

		try {
			// 覆盖创建新的高亮文件
			const existingFile = await this.app.vault.getAbstractFileByPath(newFilePath);
			if (existingFile) {
				await this.app.vault.modify(existingFile, `# Highlights\n${headers}${separator}${tableContent}`);
			} else {
				await this.app.vault.create(newFilePath, `# Highlights\n${headers}${separator}${tableContent}`);
			}
		} catch (error) {
			new Notice('Error creating or updating the highlights file.');
			console.error(error);
			return;
		}

		let updatedFileContents = fileContents;
		highlights.forEach((highlight, index) => {
			const anchor = `<a id="highlight-${index + 1}"></a>`;
			const highlightWithLink = `${anchor}==${highlight.replace(/==/g, '').trim()}== [[${newFileName}#highlight-${index + 1}]]`;
			updatedFileContents = updatedFileContents.replace(highlight, highlightWithLink);
		});

		const backupFileName = activeFile.path.replace(/(\.[^\.]+)$/, '-bak$1');
		try {
			// 创建备份文件
			await this.app.vault.create(backupFileName, fileContents);
		} catch (error) {
			new Notice('Error creating the backup file.');
			console.error(error);
			return;
		}

		try {
			// 保存修改后的内容到原文件
			await this.app.vault.modify(activeFile, updatedFileContents);
		} catch (error) {
			new Notice('Error updating the original file.');
			console.error(error);
			return;
		}

		new Notice('Highlights saved to ' + newFilePath + ' with links.');
	}
}
