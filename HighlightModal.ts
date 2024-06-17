import { App, Modal, ButtonComponent, Notice } from 'obsidian';

export class HighlightModal extends Modal {
	constructor(app: App, private onSave: () => Promise<void>) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl('h3', { text: 'Save Highlights' });
		contentEl.createEl('p', { text: 'Do you want to save the highlighted text to a new file?' });

		new ButtonComponent(contentEl)
			.setButtonText('Save')
			.onClick(async () => {
				await this.onSave();
				new Notice('Highlights have been successfully saved.');
				this.close();
			});

		new ButtonComponent(contentEl)
			.setButtonText('Cancel')
			.onClick(() => {
				this.close();
			});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
