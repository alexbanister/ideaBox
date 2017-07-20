
// global variables
var ideaBoxModel = [];
retrieveModelFromLocalStorage();
loadStoredIdeas();

// event listeners
$('#title').on('keyup', enableSave);
$('#body').on('keyup', enableSave);
$('#save').on('click', submitNewIdea);
$("#search").on("keyup", searchIdeas);
$(".clear-search").on("click", clearSearch);

function clearSearch() {
  $("#search").val('');
  searchIdeas();
}
// functions
// Dynamic Event listeners
function createEventListeners(id) {
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

//Model CRUD
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

function getIdeaIndex(id) {
  return ideaBoxModel.findIndex(function(model) {
    return model.id === id;
  });
}

function getNewIdeaId() {
  var id = retrieveIdeaIdCounterFromLocalStorage();
  id++;
  saveIdeaIdCounterToLocalStorage(id);
  return id;
}

//View Functions
function enableSave() {
  if ($('#title').val() != "" && $('#body').val() != ""){
    $('#save').attr("disabled", false);
  } else {
    $('#save').attr("disabled","disabled");
  }
}

function resetForm() {
  $('#title').val('');
  $('#body').val('');
  $('#title').focus();
}

function Idea(title, body, quality) {
  this.id = getNewIdeaId();
  this.title = title;
  this.body = body;
  this.quality = quality || 0;
}

function createIdea(title, body, quality) {
  var newIdea = new Idea(title, body, quality);
  insertIdeaToModel(newIdea);
  addIdeaToPage(newIdea.id, title, body);
}

function submitNewIdea(e) {
  e.preventDefault();
  createIdea($('#title').val(), $('#body').val());
  resetForm();
  enableSave();
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

function loadStoredIdeas() {
  $.each(ideaBoxModel, function(i, val){
    addIdeaToPage(val.id, val.title, val.body);
  });
}

//Search idea functions
function searchIdeas() {
  var regex = new RegExp ($("#search").val(), 'i');
  $.each(ideaBoxModel, function(i, val){
    if(!val.title.match(regex) && !val.body.match(regex)) {
      slideUpIdeaCard(val.id);
    } else {
      slideDownIdeaCard(val.id);
      highlightSearchText(val.id, val, regex)
    }
  });
}

function highlightSearchText(id, obj, regex) {
  var title = $('[data-id='+id+']').find("h2");
  title.html(obj.title.replace(regex, function(str) {return '<span class="highlight-search">'+str+'</span>'}));
  var body = $('[data-id='+id+']').find(".idea-text");
  body.html(obj.body.replace(regex, function(str) {return '<span class="highlight-search">'+str+'</span>'}));
}

function slideUpIdeaCard(id, killIt) {
  var elementToSlide = $('[data-id='+id+']');
  if (elementToSlide.is(":visible")) {
    elementToSlide.slideUp( "slow", function() { complete: removeIdeaFromDOM(id, killIt) });
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
  var id = locateClickedCard(e);
  slideUpIdeaCard(id, true);
  removeEventListeners(id);
  deleteIdeaFromModel(id);
}

function removeIdeaFromDOM(id, killIt) {
  if (killIt) {
    $('[data-id='+id+']').remove();
  }
}

function setQualityState(id) {
  var idea = getIdeaFromModel(id);
  var qualities = ['swill', 'plausible', 'genius'];
  $('[data-id='+id+']').find('#quality-value').text(qualities[idea.quality]);
  disableQuality(id, idea.quality);
}

function disableQuality(id, quality) {
  if (quality === 0) {
    $('[data-id='+id+']').find('#downvote').addClass('vote-disabled');
  } else {
    $('[data-id='+id+']').find('#downvote').removeClass('vote-disabled');
  }
  if (quality === 2) {
    $('[data-id='+id+']').find('#upvote').addClass('vote-disabled');
  } else {
    $('[data-id='+id+']').find('#upvote').removeClass('vote-disabled');
  }
}

function saveTitle(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  idea.title = $(e.target).closest('h2').text();
  updateIdeatoModel(idea);
}

function saveBody(e) {
  e.preventDefault();
  var id = locateClickedCard(e);
  var idea = getIdeaFromModel(id);
  idea.body = $(e.target).closest('.idea-text').text();
  updateIdeatoModel(idea);
}
