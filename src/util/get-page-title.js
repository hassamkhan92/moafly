const title = process.env.VUE_APP_TITLE || 'Moafly';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle} `;
  }
  return `${title}`;
}
