import { newSpecPage } from '@stencil/core/testing';

import { NexusFormField } from './nexus-form-field';
import { NexusInput } from '../nexus-input/nexus-input';
import { NexusTextarea } from '../nexus-textarea/nexus-textarea';
import { NexusSelect } from '../nexus-select/nexus-select';
import { NexusLabel } from '../nexus-label/nexus-label';
import { NexusErrorMessage } from '../nexus-error-message/nexus-error-message';
import { NexusFileUpload } from '../nexus-file-upload/nexus-file-upload';

// eslint-disable-next-line dot-notation
global['MutationObserver'] = jest.fn(() => ({
  observe: jest.fn()
}));

describe('nexus-form-field', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFormField],
      html: '<nexus-form-field></nexus-form-field>'
    });

    expect(page.root).toHaveClass(`nexus-form-field`);
  });

  describe('with input', () => {
    it('should set the disabled attribute to form-field', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusInput],
        html: `<nexus-form-field><nexus-input disabled></nexus-input></nexus-form-field>`
      });

      await page.waitForChanges();

      expect(page.root).toHaveClass(`nexus-disabled`);
    });

    it('should set the for attribute', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusInput, NexusLabel],
        html: `<nexus-form-field>
          <nexus-label>label</nexus-label>
          <nexus-input attr-id="nexus-label-custom-id"></nexus-input>
        </nexus-form-field>`
      });

      await page.waitForChanges();

      const label = page.root.querySelector('label');

      expect(label.htmlFor).toEqual(`nexus-label-custom-id`);
    });

    it('should have an error class if the child has an error message', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusInput, NexusErrorMessage],
        html: `<nexus-form-field>
          <nexus-input></nexus-input>
          <nexus-error-message></nexus-error-message>
        </nexus-form-field>`
      });

      await page.waitForChanges();

      expect(page.root).toHaveClass(`nexus-invalid`);
    });
  });

  describe('with textarea', () => {
    it('should set the disabled attribute for nexus-textarea', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusTextarea],
        html: `<nexus-form-field><nexus-textarea disabled></nexus-textarea></nexus-form-field>`
      });

      await page.waitForChanges();

      expect(page.root).toHaveClass(`nexus-disabled`);
    });

    it('should set the for attribute', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusTextarea, NexusLabel],
        html: `<nexus-form-field>
          <nexus-label>label</nexus-label>
          <nexus-textarea attr-id="nexus-label-custom-id"></nexus-textarea>
        </nexus-form-field>`
      });

      await page.waitForChanges();

      const label = page.root.querySelector('label');

      expect(label.htmlFor).toEqual(`nexus-label-custom-id`);
    });

    it('should have an error class if the child has an error message', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusTextarea, NexusErrorMessage],
        html: `<nexus-form-field>
          <nexus-textarea></nexus-textarea>
          <nexus-error-message></nexus-error-message>
        </nexus-form-field>`
      });

      await page.waitForChanges();

      expect(page.root).toHaveClass(`nexus-invalid`);
    });
  });

  describe('with select', () => {
    it('should set the disabled attribute for nexus-select', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusSelect],
        html: `<nexus-form-field><nexus-select disabled></nexus-select></nexus-form-field>`
      });

      await page.waitForChanges();

      expect(page.root).toHaveClass(`nexus-disabled`);
    });

    it('should have select specific class', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusSelect, NexusLabel],
        html: `<nexus-form-field>
          <nexus-label>label</nexus-label>
          <nexus-select value="1">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </nexus-select>
        </nexus-form-field>`
      });

      const label = page.root.querySelector('label');

      expect(label).toHaveClass('nexus-label-for-select');
    });
  });

  describe('with file upload', () => {
    it('should not set the for attribute', async () => {
      const page = await newSpecPage({
        components: [NexusFormField, NexusFileUpload],
        html: `<nexus-form-field><nexus-file-upload></nexus-file-upload></nexus-form-field>`
      });

      const label = page.root.querySelector('label');

      await page.waitForChanges();

      expect(label.htmlFor).toBeFalsy();
    });
  });
});
