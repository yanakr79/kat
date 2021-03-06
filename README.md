# Park "Tarutino Steppe"

## Features

- i18n (English, Russian, Ukranian)
- Site config and translations in Yaml
- SEO (meta and language tags, sitemap, Twitter, Open Graph & schema.org)

## Tech Stack

- Markdown + Gatsby.js
- Theme-UI & Emotion styling
- preval.macro
- ESLint (airbnb) + Prettier
- Firebase: functions & database
- Netlify: hosting

## License

MIT

## Installation

### Requirements

1. Have [Google](https://google.com) account.
1. Have [GitHub](https://github.com) account.
1. Have [Netlify](https://netlify.com) account.
1. Have installed **Git** on your local computer. You could download it from [here](https://git-scm.com/download).

### Steps
#### Fork Source Repository and clone it on local computer
1. Login to your [GitHub account](https://github.com).
1. In a browser open the source repository `https://github.com/alextim/kat`.
1. Create fork from source repository - click `Fork` button.
1. After process finish click button `Code`.
1. Copy your repository URL. 
   It should to be like this: `https://github.com/your-account-name/kat.git`.
1. Lanch command prompt on your computer.
   For Windows it will be: `Start` -> `Windows System` -> `Command Prompt`.
1. Select desired folder with `cd` (change directory) command.
1. Clone source repository to selected folder with the next command:

```
git clone https://github.com/your-account-name/kat.git
```

#### Connect your repository to hosting and build site
1. Login to [Netlify](https://netlify.com).
1. Click **New site from Git** button
1. Click **GitHub** button on the next screen.
1. Authorise Netlify to access GitHub in few steps.
   - Click **Authorize Application** button.
   - Click **Install** on next dialog screen.
   - Enter your GitHub password.
1. Then select repository `your-repository-name`.
1. Check **Site settings**. `Publish directoty` field should to be set to `public\`.
1. Click **Deploy site** button.  
   In few minutes your site will be live!

## Edit

1. Edit your site locally with your favorite editor.
1. Lanch command prompt on your computer.
2. Goto repository folder with `cd` command.
3. Commit your work and push changes to remote repository.
   Run the following commands in sequence:

```
git add .
git commit -m 'your message'
git push
```

Your site will be rebuilt automatically after push.

## File Naming Convention

- self explanatory names
- only English alphabet
- all symbols in lower case
- no spaces
- no transliterations
- use hyphen `-` for word separation
- no dots, underscores or special symbols

good:

```
weekend-with-family.jpg
my-awesome-file.png
```

bad:

```
asdasda-casd.jpg
мой-красивый-файл.jpg
MyAwesomeFile.jpg
moi-prijatnii-fail-.jpg
my_awesome_file.jpg
my.awesome.file.jpg
```

## SEO

| Frontmatter Field | Recommended Length  | More Info                                                                                                                                                                       | Note                                                                |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| metaTitle         | up to 60 chars      | [What is a meta title tag?](https://moz.com/learn/seo/title-tag), [Create good titles and snippets in Search Results](https://support.google.com/webmasters/answer/35624?hl=en) | If no **metaTitle** provided the **title** will be used             |
| metaDescription   | 50-160 chars        | [What is a meta description?](https://moz.com/learn/seo/meta-description), [How to create the right meta description](https://yoast.com/meta-descriptions/)                     | If no **metaDescription** provided the **description** will be used |
| alt               | less then 125 chars | [What is Alt Text?](https://moz.com/learn/seo/alt-text)                                                                                                                         | images                                                              |

_In case of neither **metaDescription** nor **description** the **site description** will be used._

Page content should to be at least 300 words.

Sources: [The Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

## Special Images

| Porpouse    | File Name                       | Folder                          | Ratio    | Dimenation, px          | Qty            | Note                                          |
| ----------- | ------------------------------- | ------------------------------- | -------- | ----------------------- | -------------- | --------------------------------------------- |
| Site        | favicon.ico                     | [PROJECT_DIR]/static            | 1 x 1    | 16 x 16                 | 1              | [Wiki](https://en.wikipedia.org/wiki/Favicon) |
| Site        | default-banner.jpg              | [PROJECT_DIR]/content/assets    | 16 x 8.1 | 1920 x 972              |
| OpenGraph   | og-banner-{locale}.jpg          | [PROJECT_DIR]/static/assets     | 1.9 x 1  | 1200 x 630 or 600 x 315 | 1 per language | any awesome picture + logo                    |
| Twitter     | twitter-banner-2x1-{locale}.jpg | [PROJECT_DIR]/static/assets     | 2 x 1    | 600 x 300               | 1 per language | any awesome picture + logo                    |
| Twitter     | twitter-banner-1x1-{locale}.jpg | [PROJECT_DIR]/static/assets     | 1 x 1    | 450 x 450               | 1 per language | any awesome picture + logo                    |
| schema.org  | business-photo.jpg              | [PROJECT_DIR]/static/assets     |          |                         | 1              | photo to present your business                |
| schema.org  | logo.svg                        | [PROJECT_DIR]/static/assets     |          |                         | 1              |
| webmainfest | icon.png                        | [PROJECT_DIR]/src/assets/images | 1 x 1    | > 512 x 512             |

_Set OpenGraph and Twitter Image Sizes in `website.js`_

## Security Recomendations

Links to _external sites_ are potentialy unsafe.
To protect our site and improve your SEO always add `rel="nofollow noreferrer noopener"` attribute to anchor tags.
With `target="_blank"` browser will open external site in new tab.

bad:

```html
<a href="https://frumushika.com/living.html">frumushika.com</a>
```

good:

```html
<a href="https://frumushika.com/living.html" target="_blank" rel="nofollow noreferrer noopener"
  >frumushika.com</a
>
```

## Settings

### General

File: `[PROJECT_DIR]\src\config\website.js`

## Language

File: `[PROJECT_DIR]\src\config\locales.json`

### Development Mode

Program uses the `LOCALES` entry in file `[PROJECT_DIR]\.env.development`.
Avalable languages present as a space separated list.

```js
LOCALES = uk;
```

Then the list will be checked against all avalable locales from `[PROJECT_DIR]\src\config\locales.json`.
Thus it's possible to use only one or few languages to speed up development time.

### Production Mode

Program simply uses all locales from file `[PROJECT_DIR]\src\config\locales.json`.

The default locale marked with `default = true`.
If no `default = true` found the first entry will be default locale.

## Modal Form

File: [PROJECT_DIR]\src\components\pages\contact\ContactForm.jsx

```js
const AUTOCLOSE_DELAY = 5000; // 5 secs
```

### Site URL

```js
const meta = {
  ...
  siteUrl: 'https://www.example.com', // No trailing slash!
};
```

### Site Data

| What         | Folder                                  | File Name             | Note                            |
| ------------ | --------------------------------------- | --------------------- | ------------------------------- |
| Main Menu    | [PROJECT_DIR]\content\data              | main-nav-items.yaml   |
| Footer Menu  |                                         | footer-nav-items.yaml |
| Social Links |                                         | social-links.yaml     | Facebook, Intagram etc          |
| Contacts     |                                         | contacts.yaml         | Phone, Skype, Viber, E-mail etc |
| Address      | [PROJECT_DIR]\content\data\address      | address.uk.yaml       | Company Name, Legal Address     |
|              |                                         | address.en.yaml       |
|              |                                         | address.ru.yaml       |
| Translations | [PROJECT_DIR]\content\data\translations | translations.uk.yaml  |
|              |                                         | translations.en.yaml  |
|              |                                         | translations.ru.yaml  |

### Translations

More convenient way to edit translations.

- Edit `JSON` files in `[PROJECT_DIR]\content\data\translations\src`.
- Run command `npm run translations:j2y`.
  It fires script which transform json-source to yaml.

## Pages

Pages are located in the folder: **[PROJECT_DIR]\src\pages**.

Each page occupies one subfolder here.

Name pattern:
`{file name}.{locale}.{extension}`

File name: in English alpahaber, no spaces, dots. Only letters in lower case.
Special name is **index** (explanation in **Routes**) .

Locale: **uk**, **en** or **ru**.

Extension: **md**.

Sample for valid file names:

```
index.ru.md
home.uk.md
```

### Routes

In a build time the routes will be created on the following algorithm:

1. source file contains field **slug** in frontmatter -> **slug** will be used
1. frontmatter hasn't field **slug** and source file name doesn't start from **index** word -> file name will be used
1. source file name starts from **index** -> parent folder name will be used

### Page Content

In general page file consists of two main components:

1. Frontmatter
2. Body

#### Frontmatter

It looks like

```md
---
title: *Page Title*
description: *Second Line in page header*
metaTitle: *for SEO. If it's omitted the **title** will be used*
metaDescription: *for SEO. If it's omitted the **description** will be used*

cover:
  default: *your-special-banner.jpg*
  mobile: *your-special-banner-used-on-small-screens.jpg*
  alt: *for SEO, alternate text for image*
  author: *image author name*

slug: *used for page route during build*
template: *name of te template sed during site build*
noindex: ***true** or **false** - show/hide page from crawler robots*

...other page specific parts
---
```

Recommended cover image sizes:

| View    | Ratio    | Size in px |
| ------- | -------- | ---------- |
| Desktop | 16 x 8.1 | 1920 x 972 |
| Mobile  | 1 x 1    | 600 x 600  |

#### Body

Any HTML and markdown tags.

## Page "Home"

Page folder: **[PROJECT_DIR]\src\pages\home**

File name: **home.[supported language code].md**

Expected file names:

```
home.uk.md
home.en.md
home.ru.md
```

Recommeded image sizes:
Section Name | Ratio | Size in px | Note
--- | --- | --- | ---
Here you can | 1 x 1 | 400 x 400 | displayed in circle
Our wild inhabitants | 4 x 3 | 400 x 300 |

## Page "Services"

Page folder: **[PROJECT_DIR]\src\pages\services**

File name: **services.[supported language code].md**

Expected file names:

```
services.uk.md
services.en.md
services.ru.md
```

Recommeded image sizes:
Name | Ratio | Size in px  
--- | --- | ---  
Service Item | 4 x 3 | 400 x 300

## Page "Gallery"

Page folder: **[PROJECT_DIR]\src\pages\gallery**

File name: **gallery.[supported language code].md**

Expected file names:

```
gallery.uk.md
gallery.en.md
gallery.ru.md
```

Videos and extra text could be inserted to body part.

Sample how to embed video:

```
<iframe src="https://www.youtube.com/embed/2Y-LqBD2HN8" width="600" height="400"></iframe>
```

\*Pay attention: you need word **"embed"** in url, not **"watch"**.

Gallery source structure sample:

```yaml
sections:
  - text: Some text to preface the gallery

  - items:
    - title: picture caption to display
      image:
        src: valid file name
        alt: picture description in one sentence (for Google Search Engine).
        author: picture's author (if exists)

    - title: My Awesome Picture #1
      image:
        src: my-awesome-picture-1.jpg
        alt: My first very special picture
        author: John Smith

    - title: My Awesome Picture #2
      image:
        src: my-awesome-picture-2.jpg
        alt: My decond very special picture
    ...

    - title: My Awesome Picture #100
      image:
        src: my-awesome-picture-100.jpg
        alt: My hundreds very special picture
        author: Bob Nad
```

_Remark: picture #2 has no author_

## TO-DO

- [ ] Lerna
- [ ] TS
- [ ] Strybook
- [ ] 404 - header and footer still in Ukranian only
- [ ] netlify
- [ ] gatsby-plugin-google-analytics
- [ ] gatsby-plugin-offline
- [ ] detect language
- [ ] link - it has no styles in the text (displays properly in Contacts, but not in Services)
- [ ] contact form - modal - add real Abort handler
- [ ] logo is black in 'Dark Mode'

## Known Issues

- **warn Query takes too long** during **build**.
  **Develop** is OK.
  By Gatsby official advice the schema customization for **SitePage** was added.
  Now it's Ok on **build**, but warn still present during build with **GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES**.

GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES

- "The result of this StaticQuery could not be fetched" with `useStaticQuery` in browser after successful build. Development mode has no any errors.
  Two solutions:
  - `useStaticQuery` -> `StaticQuery`
  - move query to `create-pages.js` or to templates as subquery
    I used the second.
- `.production.env` vars are undefined in PROD, but `.development.env` is ok in DEV
- You need CR after <br /> in Markdown
- double space and CR is not New Line
- Art direction

  https://github.com/thadroe/art-direction-images-for-gatsby

  https://www.gitmemory.com/issue/gatsbyjs/gatsby/13164/485425565

  https://github.com/gatsbyjs/gatsby/issues/15189

  https://github.com/gatsbyjs/gatsby/issues/24748

  https://github.com/gatsbyjs/gatsby/pull/21431

- Contact Form
  TextArea font has a bit smaller look, despite the same fontSize and fontFamily.
