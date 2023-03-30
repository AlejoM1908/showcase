---
title: Introduction
type: docs
bookToc: false
---

# Visual Computing Course Showcase

The [Visual Computing](https://visualcomputing.github.io/) course at the [National University of Colombia](https://unal.edu.co) is a course on the fundamentals of computer graphics and computer vision. The course is taught in the engineering faculty of the university and is part of the curriculum of the [Systems and Computing Engineering](https://ingenieria.bogota.unal.edu.co/es/formacion/pregrado/ingenieria-de-sistemas-y-computacion.html) program.

The webpage make use of a [gohugo](https://gohugo.io/) template to create rich content [academic reports](https://www.wordy.com/writers-workshop/writing-an-academic-report/) making use of [p5.js](https://p5js.org/) sketches to illustrate the concepts and results of many of the course concepts.

## Local deployment

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/AlejoM1908/showcase
$cd showcase
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

### Remarks

{{< hint info >}}
If you forked the repo don't forget to activate the github actions to deploy your site to github pages. You can do so by going to the actions tab of your repository. Don´t forget to allow the GH Pages bot to commit to your repository, otherway the workflow will fail every time.
{{< /hint >}}

{{< hint info >}}
The **showcase** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.
{{< /hint >}}