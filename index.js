function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  // get data-repo value via dataset
  const name = el.dataset.repo
  // create new XHR request
  const req = new XMLHttpRequest()
  // add event listener w callback to trigger action after data loads
  req.addEventListener("load", showCommits)
  // call open w HTTP verb + URI for request
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  // send request
  req.send()
}

function showCommits() {
  // tell JavaScript you're working with JSON
  // this.responseText is the data you're looking for
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
