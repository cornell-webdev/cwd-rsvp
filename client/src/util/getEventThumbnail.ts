import { IEvent } from 'src/types/event.type'

const getEventThumbnail = (event: IEvent) => {
  if (
    !event?.imgs ||
    event?.imgs?.length === 0 ||
    event?.imgs[0] ===
      'https://static1.campusgroups.com/upload/cornell/2019/r2_image_upload_843948_0020_07_010_selectjpg_1031162831.png'
  ) {
    return 'https://firebasestorage.googleapis.com/v0/b/rsvp-333720.appspot.com/o/temp%2Frsvp-placeholder.png?alt=media&token=0c67bd7b-ca71-417d-8e5d-81ce9aa40e80'
  }
  return event?.imgs[0]
}

export default getEventThumbnail
