/**
 * Editable contact links.
 *
 * Behance and LinkedIn are verified from the public Behance profile.
 * Email and Instagram are intentionally empty: they were not published on the
 * source profile, so nothing has been invented. Add them here when ready and
 * they will appear automatically in the site, footer and contact section.
 */
export const links: { email: string; behance: string; linkedin: string; instagram: string } = {
  email: '', // Add a real address to display it in Contact and Footer.
  behance: 'https://www.behance.net/moooshalhbaby',
  linkedin:
    'https://www.linkedin.com/profile-thirdparty-redirect/AgEgDzTTH7YhNQAAAaHMav28cAgChVQ_Ey7SfdFlDUwRaeZEfUJNL2wIOBtWnlxIGxm5uVBg6RGQSVae8kOjcRxzay4dL8193zGnGno1KS8ptjmQBfmRioMiKrjkA8iH',
  instagram: '',
}

export const liveUrl = 'https://portfolio-5ld.pages.dev/'
