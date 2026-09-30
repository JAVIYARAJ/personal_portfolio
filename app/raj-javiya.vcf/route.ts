import { siteUrl } from '@/lib/site'

// "Add to Contacts" from the hero phone's Wallet app. A vCard served as text/vcard
// opens straight into Contacts on iOS and Android; desktops download the file.
export const dynamic = 'force-static'

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Javiya;Raj;;;',
  'FN:Raj Javiya',
  'TITLE:Senior Mobile Developer',
  'EMAIL;TYPE=INTERNET,PREF:javiyaraj4@gmail.com',
  `item1.URL:${siteUrl}`,
  'item1.X-ABLabel:Portfolio',
  'item2.URL:https://github.com/JAVIYARAJ',
  'item2.X-ABLabel:GitHub',
  'item3.URL:https://linkedin.com/in/javiyaraj/',
  'item3.X-ABLabel:LinkedIn',
  'item4.URL:https://x.com/Rjcoding',
  'item4.X-ABLabel:X',
  'ADR;TYPE=WORK:;;;;;;India',
  'NOTE:Flutter\\, Native Android & web developer. Available for freelance.',
  'END:VCARD',
]

export function GET() {
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="raj-javiya.vcf"',
    },
  })
}
