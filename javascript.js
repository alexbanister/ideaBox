//Array of objects for ideas
//Expected Object structure
  // Obj = {
  //   id: getNewIdeaId(),
  //   title: "string",
  //   body: "string",
  //   quality: num || 0
  // }
var ideaBoxModel = [];
retrieveModelFromLocalStorage();

          //TESTING STUFF
          var moreObj = {
            id: getNewIdeaId(),
            title: "foo",
            body: "bar",
            quality: 0
          }
          var anotherObj = {
            id: getNewIdeaId(),
            title: "things",
            body: "stuff",
            quality: 1
          }
          var someObj = {
            id: getNewIdeaId(),
            title: "blah",
            body: "flub",
            quality: 2
          }
          insertIdeaToModel(moreObj);
          insertIdeaToModel(anotherObj);
          insertIdeaToModel(someObj);
          //TESTING STUFF

function saveModelToLocalStorage() {
  idea = JSON.stringify(ideaBoxModel);
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
  return idea;
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
  ideaBoxModel[idea.id] = idea;
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
  var regex = new RegExp (string);
  $.each(ideaBoxModel, function(i, val){
    if(!val.title.match(regex) && !val.body.match(regex)) {
      //slideUpIdeaCard(val.id);
      //this function should check if the element is hidden or not
      //This function needs to be written
    } else {
      if ($('[data-id='val.id']').is(':hidden')) {
        //This if statement should be moved to the function below
        //slideDownIdeaCard(val.id);
        //This function needs to be written
      }
    }
  });
}

$("#search").on("keyup", searchIdeas);

//Change idea quality functions
// function setQualityState(id) {
//   var
//   index = getIdeaIndex(id);
//
// }
