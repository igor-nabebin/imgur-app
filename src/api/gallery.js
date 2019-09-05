import axios from 'axios'

export async function getImages(
  {
    section = 'hot',
    sort = 'viral',
    window = 'day',
    page = 1,
    showViral = 'true',
    showMature = 'false',
    albumPreviews = 'false',
  } = {
    section: 'hot',
    sort: 'viral',
    window: 'day',
    page: 1,
    showViral: 'true',
    showMature: 'false',
    albumPreviews: 'false',
  }
) {
  try {
    const response = await axios.get(
      `api/3/gallery/${section}/${sort}/${window}/${page}`,
      {
        params: {
          showViral,
          mature: showMature,
          album_previews: albumPreviews,
        },
      }
    )
    return response.data && response.data.data
  } catch (error) {
    throw error
  }
}

export async function getImage(id) {
  try {
    const response = await axios.get(`api/3/gallery/album/${id}`)
    return response.data && response.data.data
  } catch (error) {
    throw error
  }
}
