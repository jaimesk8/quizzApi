
(function() 
 {
  var allQuestions = [{
    question: "Qual o teu nome?",
    options: [] ,
    answer: null
  },{
    question: "Qual a necessidade da engenharia de requisitos no devenvolvimento de software?",
    options: ["Para assegurar que o software vá de encontro com as necessidades do utilizador final",
              "Para reduzir o custo do software",
              "Para fazer o sofware visualmente mais apelativo",
              "Para asegurar que o software funciona em todos os sistemas operativos"],
    answer: 0
  },{
    question: "Identifique e descrever brevemente os quatro tipos de requisitos que podem ser definidos para um sistema computacional ? ",
    options: ["Requisitos de analise, Requisitos do sistema, Requisitos funcionais, Requisitos licitação.", 
              "Requisitos de utilizador, Requisitos internos, Requisitos funcionais, Requisitos não-funcionais.", 
              "Requisitos de utilizador, Requisitos do sistema, Requisitos funcionais, Requisitos não-funcionais.", 
              "Requisitos gerais, Requisitos do sistema, Requisitos funcionais, Requisitos não-funcionais."],
    answer: 2
  },{
    question: "Quais são os 3 grupos que os requisitos não-funcionais devem ter?",
    options: ["Requisitos de Produtos, Requisitos organizacionais, Requisitios externos", 
              "Requisitos de Produtos, Requisitos legais, Requisitios externos", 
              "Requisitos de eficiência, Requisitos organizacionais, Requisitios externos",
              "Requisitos de Produtos, Requisitos éticos, Requisitios externos"],
    answer: 0
  },{
    question: "De que forma é que os requisitos não-funcionais devem ser escritos?",
    options: ["Mais críticos que os requisitos funcionais", 
              "Usando uma linguagem natural estruturada", 
              "Usando notações gráficas",
              "Todas estão corretas"],
    answer: 3
  },{
    question: "Qual destas NÃO é uma técnica usada na licitação de requisitos ?",
    options: ["Intervista", "Prototipagem", "Pesquisa", "Testes"],
    answer: 3
  },{
    question: "Metrícas de espeficiação de requisitos não funcionais?",
    options: ["Velocidade", "Tamanho", "Fácil de usar", "Todas estão corretas"],
    answer: 3
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
  var quizaName = $('name');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter]) && quesCounter != 0) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Questão nº. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').remove();
                    $('#prev').remove();
                    $('#concluir').show();
                    $('#verresultados').show();
                    $('#stopButton').show();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }   
        score.append('Acertas-te em ' + correct + ' das 6 perguntas.');
        

        const options = {
          method: "POST",
          body: JSON.stringify({
                name: $("#name").val(),
                nota: correct,
                tempo: formatTime(elapsedTime)
          }),
          headers: { "Content-Type": "application/json" }
          };
  
          fetch('http://localhost:3000/save',options)//,options)
          .then(response => {return response.json()})
          .then(data => {
                console.log(data)
              })  //then data
          .catch(err => console.log(err)) 
          
        return score;
  }

})();


let startTime = null;
let elapsedTime = 0;
let intervalId = null;
const chronometerElement = document.getElementById("chronometer");

function startChronometer() {
  if (startTime === null) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateChronometer, 10);
  }
}

function stopChronometer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    elapsedTime = Date.now() - startTime;
    startTime = null;
    chronometerElement.innerHTML = formatTime(elapsedTime);
  }
}

function updateChronometer() {
  elapsedTime = Date.now() - startTime;
  chronometerElement.innerHTML = formatTime(elapsedTime);
}

function formatTime(time) {
  const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

document.getElementById("startButton").addEventListener("click", startChronometer);
document.getElementById("stopButton").addEventListener("click", stopChronometer);
