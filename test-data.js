function loadTestData() {
  createIdea('accumsan cursus justo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis sapien ac sem laoreet suscipit ac a ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed felis mi, hendrerit placerat mi eget, efficitur tincidunt sapien. Mauris augue augue, condimentum eget ex ac, accumsan cursus justo. In mollis dictum metus at scelerisque. Mauris ac arcu odio. Suspendisse eget mi vitae tellus semper sollicitudin in vel nibh. Cras ac elit nulla. Maecenas suscipit urna id erat luctus, in iaculis purus facilisis.');
  createIdea('blandit varius erat tempus', 'Praesent auctor fringilla tincidunt. Duis pharetra auctor tortor vitae posuere. Phasellus vestibulum ante leo, blandit varius erat tempus ac. Donec ligula orci, finibus vitae porta id, semper vel ligula.', 2);
  createIdea('ras accumsan ut est', 'Mauris ac fringilla dui. Donec blandit id sem vitae ornare. Cras accumsan ut est interdum posuere. Maecenas venenatis risus sed quam facilisis rhoncus. Pellentesque felis sapien, posuere et odio vitae, aliquet ultricies erat. Etiam facilisis justo purus, ut pulvinar libero ornare et. Morbi ornare condimentum turpis, vel blandit leo feugiat sed. Suspendisse sagittis urna a nulla eleifend pretium.', 1);
  createIdea('Donec quam felis','dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.', 2)
  createIdea('Curabitur ullamcorper ultricies nisi.','Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus', 1)
  createIdea('Donec sodales sagittis magna.','Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,', 0)
}

function clearTestData() {
  ideaBoxModel = []
  localStorage.clear();
  console.log(ideaBoxModel);
  console.log(localStorage);
}
