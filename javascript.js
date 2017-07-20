
// global variables
var ideaBoxModel = [];
retrieveModelFromLocalStorage();
loadStoredIdeas();

          //TESTING STUFF
          function loadTestData() {
            createIdea('accumsan cursus justo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis sapien ac sem laoreet suscipit ac a ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed felis mi, hendrerit placerat mi eget, efficitur tincidunt sapien. Mauris augue augue, condimentum eget ex ac, accumsan cursus justo. In mollis dictum metus at scelerisque. Mauris ac arcu odio. Suspendisse eget mi vitae tellus semper sollicitudin in vel nibh. Cras ac elit nulla. Maecenas suscipit urna id erat luctus, in iaculis purus facilisis.');
            createIdea('blandit varius erat tempus', 'Praesent auctor fringilla tincidunt. Duis pharetra auctor tortor vitae posuere. Phasellus vestibulum ante leo, blandit varius erat tempus ac. Donec ligula orci, finibus vitae porta id, semper vel ligula.', 2);
            createIdea('ras accumsan ut est', 'Mauris ac fringilla dui. Donec blandit id sem vitae ornare. Cras accumsan ut est interdum posuere. Maecenas venenatis risus sed quam facilisis rhoncus. Pellentesque felis sapien, posuere et odio vitae, aliquet ultricies erat. Etiam facilisis justo purus, ut pulvinar libero ornare et. Morbi ornare condimentum turpis, vel blandit leo feugiat sed. Suspendisse sagittis urna a nulla eleifend pretium.', 1);
          }

          function clearTestData() {
            ideaBoxModel = []
            localStorage.clear();
          }

// event listeners
$('#title').on('keyup', enableSave);
$('#body').on('keyup', enableSave);
$('#save').on('click', submitNewIdea);
$("#search").on("keyup", searchIdeas);

// functions
function enableSave() {
  if ($('#title').val() != "" && $('#body').val() != ""){
    $('#save').attr("disabled", false);
  } else {
    $('#save').attr("disabled","disabled");
  }
}

function Idea(title, body, quality) {
  this.id = getNewIdeaId();
  this.title = title;
  this.body = body;
  this.quality = quality || 0;
}

function submitNewIdea(e) {
  e.preventDefault();
  createIdea($('#title').val(), $('#body').val());
  $('#title').val('');
  $('#body').val('');
  enableSave();
  $('#title').focus();
}

function createIdea(title, body, quality) {
  var newIdea = new Idea(title, body, quality);
  insertIdeaToModel(newIdea);
  addIdeaToPage(newIdea.id, title, body);
}

function loadStoredIdeas() {
  $.each(ideaBoxModel, function(i, val){
    addIdeaToPage(val.id, val.title, val.body);
  });
}
function addIdeaToPage(id, title, body){
  var ideaContainerSection = $('.idea-container');
  ideaContainerSection.prepend('<article class="idea" data-id="' + id + '">' +
                                '<h2 contenteditable="true">' + title + '</h2>' +
                                '<div id="delete"></div>' +
                                '<p class="idea-text" contenteditable="true">' + body + '</p>' +
                                '<div class="quality">' +
                                  '<div class="up-down-vote" id="upvote"></div>' +
                                  '<div class="up-down-vote" id="downvote"></div>' +
                                  '<p id="quality-word">quality: <span id ="quality-value">swill</span></p>' +
                                '</div>' +
                              '</article>').hide().slideDown( "slow", function() {});
  setQualityState(id);
  createEventListeners(id);
}
function createEventListeners(id) {
//This is the eventListener jump off point
  $('[data-id='+id+']').on("blur", "h2", saveTitle);
  $('[data-id='+id+']').on("blur", ".idea-text", saveBody);
  $('[data-id='+id+']').on("click", "#downvote", downvote);
  $('[data-id='+id+']').on("click", "#upvote", upvote);
  $('[data-id='+id+']').on("click", "#delete", deleteIdea);
}
function removeEventListeners(id) {
  $('[data-id='+id+']').off("blur", "h2", saveTitle);
  $('[data-id='+id+']').off("blur", ".idea-text", saveBody);
  $('[data-id='+id+']').off("click", "#downvote", downvote);
  $('[data-id='+id+']').off("click", "#upvote", upvote);
  $('[data-id='+id+']').off("click", "#delete", deleteIdea);
}
function saveModelToLocalStorage() {
  var idea = JSON.stringify(ideaBoxModel);
  localStorage.setItem('ideaBoxModel', idea)
}

function retrieveModelFromLocalStorage() {
  var ideas = localStorage.getItem('ideaBoxModel');
    if(ideas){
      ideaBoxModel = JSON.parse(ideas);
    }
}

function saveIdeaIdCounterToLocalStorage(id) {
  currentCount = JSON.stringify(id);
  localStorage.setItem('currentIdeaId', currentCount)
}

function retrieveIdeaIdCounterFromLocalStorage() {
  var currentCount = localStorage.getItem('currentIdeaId');
  currentCount = JSON.parse(currentCount);
  return currentCount;
}

function insertIdeaToModel(idea) {
  ideaBoxModel.push(idea);
  saveModelToLocalStorage();
}

function getIdeaFromModel(id) {
  var idea = $.grep(ideaBoxModel, function(e){ return e.id == id; });
  return idea[0];
}

function getIdeaIndex(id) {
  return ideaBoxModel.findIndex(function(model) {
    return model.id === id;
  });
}

function deleteIdeaFromModel(id) {
  var index = getIdeaIndex(id);
  if(index >= 0){
    ideaBoxModel.splice(index,1);
  }
  saveModelToLocalStorage();
}

function updateIdeatoModel(idea) {
  var index = getIdeaIndex(idea.id);
  ideaBoxModel[index] = idea;
  saveModelToLocalStorage();
}

function getNewIdeaId() {
  var id = retrieveIdeaIdCounterFromLocalStorage();
  id++;
  saveIdeaIdCounterToLocalStorage(id);
  return id;
}

//Search idea functions
function searchIdeas() {
  string = $("#search").val();
  var regex = new RegExp (string, 'i');
  $.each(ideaBoxModel, function(i, val){
    if(!val.title.match(regex) && !val.body.match(regex)) {
      slideUpIdeaCard(val.id);
    } else {
      slideDownIdeaCard(val.id);
      var title = $('[data-id='+val.id+']').find("h2");
      title.html(val.title.replace(regex, function(str) {return '<span class="highlight-search">'+str+'</span>'}));
      var body = $('[data-id='+val.id+']').find(".idea-text");
      body.html(val.body.replace(regex, function(str) {return '<span class="highlight-search">'+str+'</span>'}));
    }
  });
}

function slideUpIdeaCard(id) {
  var elementToSlide = $('[data-id='+id+']');
  if (elementToSlide.is(":visible")) {
    elementToSlide.slideUp( "slow", function() {});
  }
}

function slideDownIdeaCard(id) {
  var elementToSlide = $('[data-id='+id+']');
  if (elementToSlide.is(":hidden")) {
    elementToSlide.slideDown( "slow", function() {});
  }
}
//Change idea quality functions
function locateClickedCard(e) {
  var ideaCardId = $(e.target).closest("[data-id]").data("id");
  return ideaCardId;
}

function downvote(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  idea.quality = idea.quality - 1;
  if(idea.quality < 0){
    idea.quality = 0;
  }
  updateIdeatoModel(idea);
  setQualityState(id)
}

function upvote(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  idea.quality = idea.quality + 1;
  if(idea.quality > 2){
    idea.quality = 2;
  }
  updateIdeatoModel(idea);
  setQualityState(id);
}

function deleteIdea(e) {
  e.preventDefault();
  var article = $(e.target).closest(".idea");
  slideUpIdeaCard(id);
  article.remove();
  var id = locateClickedCard(e);
  removeEventListeners(id);
  deleteIdeaFromModel(id);
}

function setQualityState(id) {
  var idea = getIdeaFromModel(id);
  var qualities = ['swill', 'plausible', 'genius'];
  var article = $('[data-id='+id+']');
  var qualityText = article.find('#quality-value');
  qualityText.text(qualities[idea.quality]);
}

function saveTitle(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  var newTitle = $(e.target).closest('h2').text();
  idea.title = newTitle;
  updateIdeatoModel(idea);
}

function saveBody(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  var newBody = $(e.target).closest('.idea-text').text();
  idea.body = newBody;
  updateIdeatoModel(idea);
}
