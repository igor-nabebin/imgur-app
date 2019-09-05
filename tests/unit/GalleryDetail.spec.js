import { shallowMount } from '@vue/test-utils'
import GalleryDetail from '@/components/GalleryDetail'

import * as galleryAPI from '@/api/gallery'

let wrapper
galleryAPI.getImage = jest.fn().mockImplementation(() => ({
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
}))

describe('GalleryDetail.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(GalleryDetail, {
      mocks: {
        $route: {
          params: { id: 'id' },
        },
      },
    })
  })
  afterEach(() => {
    galleryAPI.getImage.mockReset()
    wrapper.destroy()
  })
  it('fetches image on load', done => {
    wrapper.vm.$nextTick(() => {
      expect(galleryAPI.getImage).toHaveBeenCalledTimes(1)
      expect(galleryAPI.getImage).toHaveBeenCalledWith('id')
      expect(wrapper.vm.imageData.id).toBe('id')
      done()
    })
  })
})
