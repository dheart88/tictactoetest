// JavaScript Document

var debug = null;
var x = "x"
var o = "o"
var count = 0;
var o_win = 0;
var x_win = 0;

$(document).ready(function () {
  $("#reset").click(function () {
    $("#game li").text("+");
    $("#game li").removeClass('disable o x btn-primary btn-info');
    count = 0;
  });  

  $("#btnSetup").click(changeGrid);

  changeGrid();
});

//Start working on 7:21 PM Jakarta Timezone, Saturday, June 1 2019 
//I honestly have no idea where to start, I haven't code any JS for past 3 months due working on mobile project with dart+flutter
//I just had my overtime in the office, 
//but I think doing it in old school array is much easier and more scaleable than relying on class, so to demostrate it I'm changing the game
//by allowing users to input the grid size

//break start from 8:45 PM
//

//updated: no need to use array, I forgot about class itself is technically could work out

// var grids = [];
// 

var gridSize = 3;

function gridClick(event)
{
  var thisTarget = $(event.currentTarget);
  var winningState = 0; //0 - no winner yet, 1 - draw, 2 - x win, 3 - o win 
  if (thisTarget.hasClass('disable'))
    return;  

  
  if (!(thisTarget.hasClass('o') || thisTarget.hasClass('x')))
  {
    // console.log('test');
    if (count%2 == 0)
    {
      thisTarget.addClass('disable o btn-primary').text('o');
    }
    else{
      thisTarget.addClass('disable x btn-info').text('x');
    }
    
    // thisTarget.text(charTurn);
    count++;

    //note
    //dia..1 alias diagonal 1
    //X--
    //-X-
    //--X
    //dia..2 alias diagonal 2
    //--X
    //-X-
    //X--
    let diaX1 = 0;
    let diaO1 = 0;
    let diaX2 = 0;
    let diaO2 = 0;

    for(let i =0 ;i<gridSize; i++)
    {
      //checking for horizontal
      let xCountH = 0;
      let oCountH = 0;
      for (let j =0 ;j<gridSize; j++){
        let thisBtn = $('#game li').eq(i*gridSize+j);
        if (thisBtn.hasClass('x'))
          xCountH++;
        if (thisBtn.hasClass('o'))
          oCountH++;
      } 

      //checking for vertical
      let xCountV = 0;
      let oCountV = 0;
      for (let j =0 ;j<gridSize; j++){
        let thisBtn = $('#game li').eq(j*gridSize+i);
        if (thisBtn.hasClass('x'))
          xCountV++;
        if (thisBtn.hasClass('o'))
          oCountV++;
      } 

      //counter for diagonal 1
      let dia1Btn = $('#game li').eq(i*gridSize+i);
      if (dia1Btn.hasClass('x')) 
        diaX1++;
      if (dia1Btn.hasClass('o')) 
        diaO1++;

      //counter for diagonal 2 , equation good enough.. it's almost 10 can be optimized though ^^
      let dia2Btn = $('#game li').eq(i*gridSize+(gridSize-i-1));
      if (dia2Btn.hasClass('x')) 
        diaX2++;
      if (dia2Btn.hasClass('o')) 
        diaO2++;
      
      if ((xCountH == gridSize) || (xCountV == gridSize))
      {
        winningState = 2;
        break;
      }
      else if ((oCountH == gridSize) || (oCountV == gridSize))
      {
        winningState = 3;
        break;
      }
    }

    if ((diaX1 == gridSize) || (diaX2 == gridSize))
    {
      winningState = 2;
    }
    else if ((diaO1== gridSize) || (diaO2 == gridSize))
    {
      winningState = 3;
    }
    else if (gridSize*gridSize == count)
      winningState = 1;
  }

  //X win
  if (winningState == 2)
  {
    $("#game li").addClass('disable'); //disable everything
    x_win++;
    $('#x_win').text(x_win)
    alert('x has won the game. Start a new game');
  }
  else if (winningState == 3)
  {
    $("#game li").addClass('disable'); //disable everything
    o_win++;
    $('#o_win').text(o_win);
    alert('o has won the game. Start a new game');
  }
  else if (winningState == 1)
  {
    $("#game li").addClass('disable'); //disable everything
    alert('Tie. Please restart the game');
  }

  //i'm not removing any of this for now for reference what I might be missing..
  /*
  if ($("#one").hasClass('o') && $("#two").hasClass('o') && $("#three").hasClass('o') || $("#four").hasClass('o') && $("#five").hasClass('o') && $("#six").hasClass('o') || $("#seven").hasClass('o') && $("#eight").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#four").hasClass('o') && $("#seven").hasClass('o') || $("#two").hasClass('o') && $("#five").hasClass('o') && $("#eight").hasClass('o') || $("#three").hasClass('o') && $("#six").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#five").hasClass('o') && $("#nine").hasClass('o') || $("#three").hasClass('o') && $("#five").hasClass('o') && $("#seven").hasClass('o')) {
    alert('O has won the game. Start a new game')
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
  }
  else if ($("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') || $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') || $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') || $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') || $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') || $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x')) {
    alert('X wins has won the game. Start a new game')
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
  }
  else if (count == 9) {
    alert('Its a tie. It will restart.')
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
    count = 0
  }
  else if ($(this).hasClass('disable')) {
    alert('Already selected')
  }
  else if (count % 2 == 0) {
    count++
    $(this).text(o)
    $(this).addClass('disable o btn-primary')
    if ($("#one").hasClass('o') && $("#two").hasClass('o') && $("#three").hasClass('o') || $("#four").hasClass('o') && $("#five").hasClass('o') && $("#six").hasClass('o') || $("#seven").hasClass('o') && $("#eight").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#four").hasClass('o') && $("#seven").hasClass('o') || $("#two").hasClass('o') && $("#five").hasClass('o') && $("#eight").hasClass('o') || $("#three").hasClass('o') && $("#six").hasClass('o') && $("#nine").hasClass('o') || $("#one").hasClass('o') && $("#five").hasClass('o') && $("#nine").hasClass('o') || $("#three").hasClass('o') && $("#five").hasClass('o') && $("#seven").hasClass('o')) {
      alert('O wins')
      count = 0
      o_win++
      $('#o_win').text(o_win)
    }
  }
  else {
    count++
    $(this).text(x)
    $(this).addClass('disable x btn-info')
    if ($("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') || $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') || $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') || $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') || $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') || $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x')) {
      alert('X wins')
      count = 0
      x_win++
      $('#x_win').text(x_win)
    }
  }
  */
}

function changeGrid()
{
  var temp = $('#gridSize').val();

  if(temp !== null) {
    if(temp.length > 0) {
        if (!isNaN(temp)) {
          gridSize = parseInt(temp);
        }
        else 
        {
          alert("should be number");//just simple alert, then return, sorry can't make it fancy now..
          $('#gridSize').val(3); //when it's not string just revert to default value
          return;
        }  
    }
  }

  //empty current board
  $('#game').empty();
  
  //recreate new board, don't bother with css now
  for(var i = 0; i<gridSize; i++)
  {
    for(var j = 0; j<gridSize; j++)
    {
      // console.log(i*gridSize+j);
      $('#game').append('<li class="btn span1" onclick="gridClick(event);">+</li>');
      
    }
  }

  //I know this is hacky approach, change the tictactoe container size based on gridsize
  $('#tic-tac-toe').width(gridSize*80+25);

  console.log("here");
}