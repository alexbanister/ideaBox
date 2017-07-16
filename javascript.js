//Array of objects for ideas
//Expected Object structure
  // Obj = {
  //   id:
  //   title:
  //   body:
  //   quality:
  // }
var ideaBoxModel = [];
retrieveModelFromLocalStorage();
//TESTING STUFF
var moreObj = {id: getNewIdeaId(), name: "bar", thing: "stuff" }
var anotherObj = { id: getNewIdeaId(), name: "something", val: "foo" }
var someObj = { id: getNewIdeaId(), name: "alex", place: "home" }

insertIdeaToModel(moreObj);
insertIdeaToModel(anotherObj);
insertIdeaToModel(someObj);

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

function deleteIdeaFromModel(id) {
  index = ideaBoxModel.findIndex(function(model) {
    return model.id === id;
  });
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
