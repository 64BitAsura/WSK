import { Component, h, Host, Prop, Element, State, Event, EventEmitter } from '@stencil/core';

import FileIcCloudUpload24px from '../../assets/icons/file/ic_cloud_upload_24px.svg';

const nexFilUplCls = 'nexus-file-upload-drag-over';

let nextUniqueId;
nextUniqueId = 0;
@Component({
  tag: 'nexus-file-upload',
  shadow: false,
  styleUrl: 'nexus-file-upload.scss'
})
export class NexusFileUpload {
  private readonly _id: string;

  @Element() element: HTMLNexusFileUploadElement;

  /**
   * Specifies file types the user can select from.
   */
  @Prop() accept: string = '*';

  /**
   * The Unique identifier for the input and the label to match.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string = '';

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether you can upload multiple files at once.
   */
  @Prop() multiple: boolean = false;

  /**
   * Whether the input is required.
   */
  @Prop() required: boolean = false;

  @State() hasInput: boolean = true;

  /**
   * Event fired if an error occurs. IE11 does not support dynamically setting files on an input so this error will be triggered.
   */
  @Event() errorEvent: EventEmitter;

  private drags = 0;

  constructor() {
    nextUniqueId += 1;
    this._id = this.attrId ? this.attrId : `nexus-file-upload-${nextUniqueId}`;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidLoad() {
    this.element.addEventListener(
      'dragenter',
      (event) => {
        event.preventDefault();

        this.drags++;

        this.element.classList.add(nexFilUplCls);
      },
      false
    );

    this.element.addEventListener(
      'dragleave',
      (event: any) => {
        event.preventDefault();

        this.drags--;

        if (!this.drags) {
          this.element.classList.remove(nexFilUplCls);
        }
      },
      false
    );

    this.element.addEventListener(
      'dragover',
      (event) => {
        event.preventDefault();
      },
      false
    );

    this.element.addEventListener(
      'drop',
      (event) => {
        event.preventDefault();

        this.handleDrop(event);
      },
      false
    );
  }

  render() {
    return (
      <Host
        class={{
          'nexus-file-upload': true,
          'nexus-disabled': this.disabled
        }}
      >
        <label class="nexus-file-upload-label-wrap">
          {this.hasInput && (
            <input
              nexus-file-input
              type="file"
              id={this._id}
              class="nexus-visually-hidden"
              onChange={this.handleChange}
              accept={this.accept}
              multiple={this.multiple}
              disabled={this.disabled}
              required={this.required}
            ></input>
          )}

          <span class="nexus-file-upload-label">
            <nexus-icon content={FileIcCloudUpload24px}></nexus-icon>
            <span class="nexus-file-upload-label-text">
              <slot />
            </span>
          </span>
        </label>
      </Host>
    );
  }

  private handleChange() {
    this.hasInput = false;

    const renderTime = 10;

    setTimeout(() => {
      this.hasInput = true;
    }, renderTime);
  }

  private handleDrop(event) {
    const fileInput: HTMLInputElement = this.element.querySelector('[nexus-file-input]');

    this.element.classList.remove(nexFilUplCls);

    try {
      fileInput.files = event.dataTransfer.files;
      fileInput.dispatchEvent(new CustomEvent('change', { bubbles: true }));
    } catch (error) {
      this.errorEvent.emit('This browser does not support drag and drop.');
    }
  }
}
