import { shallowMount } from '@vue/test-utils'
import ImageGallery from '@/components/ImageGallery'

import * as galleryAPI from '@/api/gallery'

let wrapper
galleryAPI.getImages = jest.fn().mockImplementation(() => [
  {
    id: 'id',
    title: 'title',
    description: 'description',
    link: 'link',
    images: [
      {
        id: 'image_id',
        title: 'image_title',
        description: 'image_description',
        type: 'image/png',
        link: 'image_link',
        ups: 10,
        downs: 9,
        score: 11,
      },
    ],
  },
])

describe('ImageGallery.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(ImageGallery, {
      stubs: {
        masonry: true,
      },
    })
  })
  afterEach(() => {
    galleryAPI.getImages.mockReset()
    wrapper.destroy()
  })
  it('fetches images on load', done => {
    wrapper.vm.$nextTick(() => {
      const images = wrapper.findAll('.block')
      expect(images).toHaveLength(1)
      expect(images.at(0).props().image.id).toBe('id')
      done()
    })
  })
  it('fetches images on filterData update', done => {
    wrapper.vm.filterData.showViral = false
    wrapper.vm.$nextTick(() => {
      expect(galleryAPI.getImages).toHaveBeenCalledTimes(2)
      expect(galleryAPI.getImages.mock.calls[1][0].showViral).toBe(false)
      done()
    })
  })
  it('shows correct filters if section is "hot"', () => {
    const filters = wrapper.findAll('.filter')
    expect(filters).toHaveLength(2)
    expect(filters.at(0).props().id).toBe('section')
    expect(filters.at(1).props().id).toBe('sort')
  })
  it('shows correct filters if section is "top"', () => {
    wrapper.vm.filterData.section = 'top'
    const filters = wrapper.findAll('.filter')
    expect(filters).toHaveLength(3)
    expect(filters.at(0).props().id).toBe('section')
    expect(filters.at(1).props().id).toBe('period')
    expect(filters.at(2).props().id).toBe('sort')
  })
  it('shows correct filters if section is "user"', () => {
    wrapper.vm.filterData.section = 'user'
    const filters = wrapper.findAll('.filter')
    expect(filters).toHaveLength(3)
    expect(filters.at(0).props().id).toBe('section')
    expect(filters.at(1).props().id).toBe('viral')
    expect(filters.at(2).props().id).toBe('sort')
  })
})
