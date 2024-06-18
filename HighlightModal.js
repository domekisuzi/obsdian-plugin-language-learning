import { __awaiter } from "tslib";
import { Modal, Notice, ButtonComponent } from 'obsidian';
export class HighlightModal extends Modal {
    constructor(app, onSave) {
        super(app);
        this.onSave = onSave;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Are you sure you want to save the highlighted text to a file?');
        new ButtonComponent(contentEl)
            .setButtonText('Save')
            .onClick(() => __awaiter(this, void 0, void 0, function* () {
            yield this.onSave();
            new Notice('Highlights saved!');
            this.close();
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlnaGxpZ2h0TW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIaWdobGlnaHRNb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFPLEtBQUssRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9ELE1BQU0sT0FBTyxjQUFlLFNBQVEsS0FBSztJQUN4QyxZQUFZLEdBQVEsRUFBVSxNQUEyQjtRQUN4RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFEa0IsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7SUFFekQsQ0FBQztJQUVELE1BQU07UUFDTCxNQUFNLEVBQUMsU0FBUyxFQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsK0RBQStELENBQUMsQ0FBQztRQUVuRixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUM7YUFDNUIsYUFBYSxDQUFDLE1BQU0sQ0FBQzthQUNyQixPQUFPLENBQUMsR0FBUyxFQUFFO1lBQ25CLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVKLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQzthQUM1QixhQUFhLENBQUMsUUFBUSxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ04sTUFBTSxFQUFDLFNBQVMsRUFBQyxHQUFHLElBQUksQ0FBQztRQUN6QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBCdXR0b25Db21wb25lbnQgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgb25TYXZlOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLnNldFRleHQoJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzYXZlIHRoZSBoaWdobGlnaHRlZCB0ZXh0IHRvIGEgZmlsZT8nKTtcblxuXHRcdG5ldyBCdXR0b25Db21wb25lbnQoY29udGVudEVsKVxuXHRcdFx0LnNldEJ1dHRvblRleHQoJ1NhdmUnKVxuXHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCB0aGlzLm9uU2F2ZSgpO1xuXHRcdFx0XHRuZXcgTm90aWNlKCdIaWdobGlnaHRzIHNhdmVkIScpO1xuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdG5ldyBCdXR0b25Db21wb25lbnQoY29udGVudEVsKVxuXHRcdFx0LnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpXG5cdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cbn1cbiJdfQ==