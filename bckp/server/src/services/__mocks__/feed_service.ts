function feedData() {
  return {
    image: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg',
    startDate: '2020-06-21T17:00:00.000Z',
    summary: '<p>The Apple Events podcast is home to the latest keynote addresses. Listen to announcements of new products and services and browse the archive of past events to relive revolutionary moments in the history of personal technology.</p>'
  };
}

export const getFeedByURL = jest.fn().mockResolvedValue(feedData());

