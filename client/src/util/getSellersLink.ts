const getSellersLink = ({ eventId, sellerId }: { eventId: string; sellerId: string }) => {
  return `https://cornellrsvp.com/event/${eventId}?sellerId=${sellerId}`
}

export default getSellersLink
