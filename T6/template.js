
function taskEdit(t) {
  let pageHTMl = `<form class='w3-container' action=\"/${t.id}\" method=\"POST\" onsubmit=\"document.getElementById('newTaskForm').style.display = 'none';\"><label class=\"w3-text-teal\"><b>ID</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"id\" value = \"${t.id}\"><label class=\"w3-text-teal\"><b>Tipo</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"tipo\" value=\"${t.tipo}\"><label class=\"w3-text-teal\"><b>Descrição</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"descricao\" value=\"${t.descricao}\"><label class=\"w3-text-teal\"><b>Quem</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"quem\" value=\"${t.quem}\"><label class=\"w3-text-teal\"><b>Data Início</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"dataIni\" value=\"${t.dataIni}\"><label class=\"w3-text-teal\"><b>Data Fim</b></label> <input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"dataFim\" value=\"${t.dataFim}\"><label class=\"w3-text-teal\"><b>Feita</b></label><input class=\"w3-input w3-border w3-light-grey\" type=\"text\" name=\"feita\" value=\"${t.feita}\"><input class=\"w3-btn w3-blue-grey\" type=\"submit\" value=\"Registar\"/><input class=\"w3-btn w3-blue-grey\" type=\"reset\" value=\"Limpar valores\"/> </form>`;
  return pageHTMl
}

function generateID(tarefas){
  let id = tarefas.length;
  let ids = []
  tarefas.forEach(t =>{
    ids.push(t.id)
  })
  while (ids.includes(id.toString())){
    id++;
  }
  return id

}

// Template para a página principal ------------------
exports.geraPagTarefas = function (tarefas, d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista de Tarefas</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="listIcon.ico"/>
              <link rel="stylesheet" href="w3.css"/>
              <link rel="stylesheet" href="style.css"/>
              
              <!-- Font Awesome -->
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
              
              <!-- Bootstrap core CSS -->
              <link href="http://mdbootstrap.com/live/_doc/css/bootstrap.min.css" rel="stylesheet">
              
              <!-- Material Design Bootstrap -->
              <link href="http://mdbootstrap.com/live/_doc/css/mdb.min.css" rel="stylesheet">
              

              <!-- SCRIPTS -->
              <!-- JQuery -->
              <script type="text/javascript" src="http://mdbootstrap.com/live/_doc/js/jquery.min.js"></script>
              
              <!-- Bootstrap core JavaScript -->
              <script type="text/javascript" src="http://mdbootstrap.com/live/_doc/js/bootstrap.min.js"></script>
              
              
              
          </head>
          <body>
              <script>
              // Initialize collapse button
              $(".button-collapse").sideNav();
              // Initialize collapsible (uncomment the line below if you use the dropdown variation)
              $('.collapsible').collapsible();
              </script>
              <div class="w3-container w3-orange">
                
              <!--Navbar-->
              <nav class="navbar">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand waves-effect waves-light" href="/" style="font-size:2em"><b>Lista de Tarefas</b></a>
                  </div>
              
                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                    <ul class="nav navbar-nav">
                      <li class="dropdown">
                          <a href="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" role="button" aria-expanded="false">Categorias <span class="caret"></span></a>
                          <ul class="dropdown-menu" role="menu">
                          <li><a href="/tarefas" class="collapsible-header waves-effect arrow-r"><i class="fa fa-tag"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Todas</a></li>
                         
                      
                     
                   
     
                         
   
    `
                 
                let categorias = []
                tarefas.forEach(t => {
                      
                      if (!categorias.includes(t.tipo)){
                        categorias.push(t.tipo)
                        pagHTML += ` 
                        <li><a href="/categorias/${t.tipo}" class="collapsible-header waves-effect arrow-r"><i class="fa fa-tags"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${t.tipo}</a>
                      </li>
                     `
                      }
                 
                })
                       
      pagHTML += `         
    
      </ul>
      </li>
      </ul>
   
    </div>
  </div>
</nav>
<!--/.Navbar-->
              </div>

              <script>
                function showForm(){
                document.getElementById('newTaskForm').style.display = "block";
                }
              </script>

             
              <span id="editTaskForm">
              </span>

              <div id="novaTarefa">
                <button type="button" class="btn btn-warning" onclick="showForm()">Adicionar Tarefa</button>
              </div>

              <span id="newTaskForm" style="display:none;">
              <h3>Inserir Nova Tarefa:</h3>
              <form class="w3-container" action="/tarefaNova" method="POST" onsubmit="document.getElementById('newTaskForm').style.display = 'none';">
              
              <input class="w3-input w3-border w3-light-grey" type="hidden" name="id" value="${generateID(tarefas)}">

              <label class="w3-text-teal"><b>Tipo</b></label>
              <input class="w3-input w3-border w3-light-grey" type="text" name="tipo">
            
              <label class="w3-text-teal"><b>Descrição</b></label>
              <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
  
              <label class="w3-text-teal"><b>Quem</b></label>
              <input class="w3-input w3-border w3-light-grey" type="text" name="quem">
  
              <label class="w3-text-teal"><b>Data Início</b></label>
              <input class="w3-input w3-border w3-light-grey" type="date" name="dataIni">

              <label class="w3-text-teal"><b>Data Fim</b></label>
              <input class="w3-input w3-border w3-light-grey" type="date" name="dataFim">

              <input class="w3-input w3-border w3-light-grey" type="hidden" name="feita" value="false">
            
              <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
              <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            
            </form>
                
              </span>
            

              <div class="w3-row" style="margin:30px">
              <h5><b>Tarefas por Fazer<b></h5>
              <div  class="table-responsive">
              <table class="table table-striped" id="tarefas">
                <thead>
                <tr>
                    <th scope ="col">Tipo</th>
                    <th scope ="col">Descrição</th>
                    <th scope ="col">Quem</th>
                    <th scope ="col">Data Início</th>
                    <th scope ="col">Data Fim</th>
                    <th scope ="col">Editar</th>
                    <th scope ="col">Apagar</th>
                    <th scope ="col">Feita</th>
                </tr>
                </thead>
                <tbody>
`              
              tarefas.forEach(t => {
                  if (t.feita == "false") {
                    page = taskEdit(t)
                  pagHTML += `
                  <tr>
                     
                      <td>${t.tipo}</td>
                      <td>${t.descricao}</td>
                      <td>${t.quem}</td>
                      <td>${t.dataIni}</td>
                      <td>${t.dataFim}</td>
                      <td><img src="public/pencil.ico" width="20px" onclick="editTask('${t.id}', '${t.tipo}', '${t.descricao}', '${t.quem}', '${t.dataIni}', '${t.dataFim}', '${t.feita}')" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1"></td>
                      <td><form action="/delete/${t.id}" method="POST"><input type="image" src="public/trash.ico" width="20px" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1"></form></td>
                      <td>
                        <form action="/taskDone/${t.id}" method="POST">
                        <input type="hidden" name="id" value="${t.id}">
                        <input type="hidden" name="tipo" value="${t.tipo}">
                        <input type="hidden" name="descricao" value="${t.descricao}">
                        <input type="hidden" name="quem" value="${t.quem}">
                        <input type="hidden" name="dataFim" value="${t.dataIni}">
                        <input type="hidden" name="dataIni" value="${t.dataFim}">

                        <input type="image" src="check.png" width="20px" value="true" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1" onclick="this.form.submit()">

                        </form>
                      </td>
                  </tr>
                  `
                }
              });

pagHTML += `
      </tbody>
      </table>
              </div>
              </div>
        
              <script>

                function editTask(id, tipo, descricao, quem, dataIni, dataFim, feita){
                  document.getElementById('editTaskForm').innerHTML = '<form class="w3-container" action="/edit/' + id + '" method="POST" ><label class="w3-text-teal"><b>ID</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="id" value = "' + id + '"><label class="w3-text-teal"><b>Tipo</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="tipo" value="' + tipo + '"><label class="w3-text-teal"><b>Descrição</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="descricao" value="' + descricao + '"><label class="w3-text-teal"><b>Quem</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="quem" value="' + quem + '"><label class="w3-text-teal"><b>Data Início</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="dataIni" value="' + dataIni + '"><label class="w3-text-teal"><b>Data Fim</b></label> <input class="w3-input w3-border w3-light-grey" type="text" name="dataFim" value="' + dataFim + '"><label class="w3-text-teal"><b>Feita</b></label><input class="w3-input w3-border w3-light-grey" type="text" name="feita" value="' + feita + '"><input class="w3-btn w3-blue-grey" type="submit" value="Registar"/><input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> </form>';
                }
              </script>

              <div class="w3-row" style="margin:30px">
              <h5><b>Tarefas Feitas</b></h5>
              <div  class="table-responsive">
              <table class="table table-striped" id="tarefas">
                <thead>
              
                  <tr>
                      <th scope="col">Tipo</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Quem</th>
                      <th scope="col">Data Início</th>
                      <th scope="col">Data Fim</th>
                      <th scope="col">Apagar</th>
                  </tr>
                </thead>
                <tbody>
`             
              tarefas.forEach(t => {
                  if (t.feita == "true") {
                  pagHTML += `
                  <tr style="text-decoration: line-through;">
                      <td>${t.tipo}</td>
                      <td>${t.descricao}</td>
                      <td>${t.quem}</td>
                      <td>${t.dataIni}</td>
                      <td>${t.dataFim}</td>
                      <td><form action="/delete/${t.id}" method="POST"><input type="image" src="public/trash.ico" width="20px" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1"></form></td>
                  </tr>
                  
    `           }  
            });   
  
    pagHTML += `
          </tbody>
          </table>
          </div>
              </div>
     
          <div class="footer">
              <address>Gerado por toDo::DAW2020 --------------</address>
          </div>
      </body>
      </html>
`
    return pagHTML
  }
