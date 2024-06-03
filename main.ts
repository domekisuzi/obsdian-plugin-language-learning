import {Notice, Plugin} from 'obsidian';
import { HighlightModal } from './HighlightModal';

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

		const fileContents = await this.app.vault.read(activeFile);
		const highlights = fileContents.match(/\=\=(.*?)\=\=/g) || [];
		if (highlights.length === 0) {
			new Notice('No highlights found.');
			return;
		}

		// Prepare table headers based on the number of columns in the first highlight
		const firstHighlightColumns = highlights[0].replace(/==/g, '').trim().split('|').length;
		const headers = '| ' + ' | '.repeat(firstHighlightColumns).trim() + ' |\n';
		const separator = '| ' + '--- | '.repeat(firstHighlightColumns).trim() + ' |\n';

		const tableContent = highlights.map(h => {
			const parts = h.replace(/==/g, '').trim().split('|').map(part => part.trim()).join(' | ');
			return `| ${parts} |`;
		}).join('\n');

		const newFilePath = activeFile.path.replace(/\..+$/, '-highlights.md');

		// Save the content with headers
		await this.app.vault.create(newFilePath, `# Highlights\n${headers}${separator}${tableContent}`);

		// Create a bidirectional link
		const originalFileName = activeFile.basename;
		const highlightFileName = newFilePath.slice(newFilePath.lastIndexOf('/') + 1, newFilePath.lastIndexOf('.'));
		const backLinkToOriginal = `[[${originalFileName}]]`;
		const linkToHighlights = `[[${highlightFileName}]]`;

		// Append links to both files
		await this.app.vault.append(activeFile.path, `\n\nLink to highlights: ${linkToHighlights}`);
		await this.app.vault.append(newFilePath, `\n\nBacklink to original file: ${backLinkToOriginal}`);

		new Notice('Highlights saved to ' + newFilePath + ' with links.');
	}

}
