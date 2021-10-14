function JogoDaVelha(){
    const arraysVitoria = [
      [1,0,0,1,0,0,1,0,0],
      [0,1,0,0,1,0,0,1,0],
      [0,0,1,0,0,1,0,0,1],
      [1,1,1,0,0,0,0,0,0],
      [0,0,0,1,1,1,0,0,0],
      [0,0,0,0,0,0,1,1,1],
      [0,0,1,0,1,0,1,0,0],
      [1,0,0,0,1,0,0,0,1]
    ];
  
    const jogadores = [
      {
        nome: "Jogador 1",
        marcador: "X",
        pontos: 0
      },
      {
        nome: "Jogador 2",
        marcador: "O",
        pontos: 0
      }
    ];
  
    const $domPlacarPlayer1 = document.querySelector('#pontos-player-1'),
          $domPlacarPlayer2 = document.querySelector('#pontos-player-2'),
          $domPlayer1       = document.querySelector('[data-player="1"]'),
          $domPlayer2       = document.querySelector('[data-player="2"]');
  
    let rodadas  = 1,
        vezAtual = jogadores[0],
        arrayDom = [];
  
    const proximoJogador = () => {
      if(vezAtual.nome == jogadores[0].nome){
        $domPlayer1.classList.remove("marcar-vez");
        $domPlayer2.classList.add("marcar-vez");
        vezAtual = jogadores[1];
      }else{
        $domPlayer2.classList.remove("marcar-vez");
        $domPlayer1.classList.add("marcar-vez");
        vezAtual = jogadores[0];
      }
    }
  
    const marcarJogada = $domElemento => {
      $domElemento.innerHTML = vezAtual.marcador
      $domElemento.setAttribute("marcado", true);
    };
  
    const verificarVitoria = () => {
      return new Promise((sucess, error) => {
        let vitoria = false;
        arraysVitoria.forEach(array => {
          let count = 0;
          for(let indice in array){
            if(array[indice] == 1){
              if(array[indice] == arrayDom[indice]){
                count++;
              }
            }
          }
  
          if(count >= 3){
            vitoria = true;
          }
        })
        sucess(vitoria);
      })
    }
  
    const mapearDom = () => {
      let $td = [...document.querySelectorAll("#jogo-velha td")];
      arrayDom = $td.map(e => (e.innerHTML == vezAtual.marcador) ? 1 : 0); 
    }
  
    const registrarPonto = () => {
      (vezAtual.nome == jogadores[0].nome) ? jogadores[0].pontos++ : jogadores[1].pontos++;
      $domPlacarPlayer1.innerHTML = jogadores[0].pontos;
      $domPlacarPlayer2.innerHTML = jogadores[1].pontos;
    }
  
    const recomecarJogo = () => {
      const $td           = document.querySelectorAll("#jogo-velha td"),
            $domQtdRodada = document.querySelector("#quantidade-rodada");
  
      $td.forEach(e => {
        e.innerHTML = '';
        e.removeAttribute("marcado");
      })
  
      $domQtdRodada.innerHTML = rodadas;
    }
  
    const registrarRodada = () => rodadas++;
  
    const verificarVelha = () => {
      let countTd = document.querySelectorAll('td[marcado="true"]').length;
      if(countTd == 9){
        alert("Oops, deu velha");
        registrarRodada();
        recomecarJogo();
      }
    }
  
    this.registrarJogada = $domElemento => {
      marcarJogada($domElemento);
      mapearDom();
      verificarVitoria()
        .then(result => {
        if(result){
          registrarPonto();
          registrarRodada();
          alert(`${vezAtual.nome} venceu a rodada`);
          recomecarJogo();
        }else{
          verificarVelha();
          proximoJogador();
        }
      })
    }
  }
  
  // --------------------------------------------------------------------
  
  const $domGame = document.querySelector("#jogo-velha"),
        Jogo     = new JogoDaVelha();
  
  $domGame.addEventListener("click", e => {
    if(e.target.nodeName == "TD" && !e.target.attributes.marcado){
      Jogo.registrarJogada(e.target);
    }
  })