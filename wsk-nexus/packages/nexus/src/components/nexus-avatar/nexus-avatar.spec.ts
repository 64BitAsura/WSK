import { NexusAvatar } from './nexus-avatar';
import { newSpecPage } from '@stencil/core/testing';

const nexAvatar = '<nexus-avatar></nexus-avatar>';
describe('nexus-avatar', () => {
  it('should have the global class nexus-avatar', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: nexAvatar
    });
    expect(page.root.querySelectorAll('.nexus-avatar').length).toEqual(1);
  });

  it('should set a default avatar size if not added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: nexAvatar
    });

    expect(page.root.querySelector('.avatar-size-lg'));
  });

  it('should have class nexus-avatar-extended-class if props class-name added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: `<nexus-avatar avatar-class-name="nexus-avatar-extended-class"></nexus-avatar>`
    });
    expect(page.root.querySelector('.nexus-avatar-extended-class'));
  });

  it('should have class avatar-logo if props avatarLogoIcon added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: `<nexus-avatar avatar-logo-icon="../assets/icons/action/ic_perm_identity_24px.svg"></nexus-avatar>`
    });

    expect(page.root.querySelector('.avatar-logo'));
  });

  it('should have class avatar-image if props avatarImageSrc added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: `<nexus-avatar avatar-image-src="../assets/images/avatar.png"></nexus-avatar>`
    });

    expect(page.root.querySelector('.avatar-image'));
  });

  it('should have class avatar-status-online if props avatarStatus added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: `<nexus-avatar avatar-status="online"></nexus-avatar>`
    });

    expect(page.root.querySelector('.avatar-status-online'));
  });

  it('should have class avatar-notification if props avatarStatus added', async () => {
    const page = await newSpecPage({
      components: [NexusAvatar],
      html: `<nexus-avatar avatar-notification="1"></nexus-avatar>`
    });

    expect(page.root.querySelector('.avatar-notifiction'));
  });
});
