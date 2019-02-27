import SanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

const NERDNIGHT = '98555641-f6f9-45ac-9066-6415908c2151'
const TIMEOUT = 6000
const slide = document.getElementById('slide')

const client = new SanityClient({
  projectId: 'mx0t3s2w',
  dataset: 'production',
  useCdn: true
})

const builder = new ImageUrlBuilder(client)

let images = []
let index = 0
let timer = null

client.getDocument(NERDNIGHT)
  .then(exhibition => {
    images = exhibition.images
    displayImage()
    timer = setInterval(displayImage, TIMEOUT)
  })
  .catch(error => console.error(error))

function displayImage() {
  console.log(builder.image(images[index]).toString())

  slide.src = builder.image(images[index])

  index++
  if (index > images.length) {
    clearInterval(timer)
    location.reload()
  }
}