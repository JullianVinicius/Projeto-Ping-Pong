//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha / 2;

//Velocidade da bolinha
let VelxBolinha = 6
let VelyBolinha = 6

//Variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let VelyOponente;

let Colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do Jogo

let Raquetada;
let Ponto;
let Trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  MostraBolinha();
  MovimentaBolinha();
  VerificaColisaoBorda();
  MostrarRaquete(xRaquete, yRaquete);
  MovimentaMinhaRaquete();
//verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  MostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  MovimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  MarcaPonto();
//Caso a bolinha fique presa na borda
  BolinhaNaoFicaPresa()
}

function MostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha)
}

function MovimentaBolinha(){
  xBolinha += VelxBolinha;
  yBolinha += VelyBolinha;
  
}

function VerificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    VelxBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio <0){
    VelyBolinha *= -1;
  }
}

function MostrarRaquete(x, y){
  rect(x, y, wRaquete, hRaquete);
}

function MovimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
    }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;     
      }
}

function VerificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete 
      && yBolinha - raio <yRaquete + hRaquete 
      && yBolinha + raio > yRaquete){
    VelxBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  Colidiu =
  collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (Colidiu){
    VelxBolinha *= -1;
    raquetada.play();
  }
}

function MovimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
    }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;     
      }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color (255, 140, 0));
  rect(180, 6, 40, 25);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255, 140, 0));
  rect(380, 6, 40, 25);
  fill(255);
  text(pontosDoOponente, 400, 26);
}

function MarcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function BolinhaNaoFicaPresa() {
  if (xBolinha - raio <= 0){
    xBolinha = 35;
  } else {
if (xBolinha - raio >= 588){
      xBolinha = width - 35;
    }
  }
}