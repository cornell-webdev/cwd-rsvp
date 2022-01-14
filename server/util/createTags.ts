import Tag from '../models/Tag'

const createTags = async () => {
  const tags = await Tag.find()
  if (!tags || tags?.length === 0) {
    console.log('*** creating new tags')
    const newTags = [
      {
        name: 'professional',
        backgroundColor: '#E9F5F5',
        color: '#71B6BA',
      },
      {
        name: 'entertainment',
        backgroundColor: '#FEF3D6',
        color: '#E8AC15',
      },
      {
        name: 'sports',
        backgroundColor: '#E3E8F4',
        color: '#8F9ACF',
      },
    ]
    newTags.forEach((tag) => {
      new Tag(tag).save()
    })
  }
}

export default createTags
