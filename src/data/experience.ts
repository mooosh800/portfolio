/**
 * Experience & qualifications.
 *
 * No employment history, education entries or certificates are published on
 * the source Behance account. Only verified public facts are listed here.
 * Add real entries to `roles`, `education` and `certificates` when available —
 * the Experience section will render them automatically.
 */
export const verifiedExperience = [
  {
    label: 'Creative practice',
    value: 'Graphic designer & UGC creator & Photographer',
    detail: 'Occupation listed on the public Behance profile.',
    year: '—',
  },
  {
    label: 'Availability',
    value: 'Available for freelance',
    detail: 'Freelance availability shown on Behance.',
    year: 'Now',
  },
  {
    label: 'Behance membership',
    value: 'Member since July 25, 2024',
    detail: 'Public profile record.',
    year: '2024',
  },
] as const

export const roles: {
  title: string
  organization: string
  period: string
  description: string
}[] = []

export const education: {
  qualification: string
  institution: string
  period: string
}[] = []

export const certificates: {
  name: string
  issuer: string
  year: string
  url?: string
}[] = []

export const sourceNote =
  'No employment history, academic qualifications or certificates are published on the source Behance profile. Nothing has been invented — this section lists only verified public information and is ready for real entries.'
