$(window).load(function(){
  mainNav();
  magazinesHover();
  productEvt();
  mobileBtn();
  mobileNav();

})




function mainNav(){

  var $mainMenu = $('nav.gnb .mainMenu > li > a');
  var $subMenu = $('nav.gnb ul.subMenu');
  var $mainBg = $('<div class="mainBg"></div>') //bg생성
  
  $mainBg.appendTo('.headerWrap');
 

  $subMenu.slideUp(0);
  $mainBg.slideUp(0);
  onScroll();

  

  $mainMenu.on('mouseenter focus', onMenu)
  $('.headerWrap').on('mouseleave', outMenu)
  $subMenu.children().last().children('a').on('focusout', outMenu);
  
  $(window).on('scroll resize', onScroll);
  

  function onScroll(){
    var $headerTop = $(window).scrollTop();
    var $headerWidth = $(window).outerWidth();

    if($headerTop > 100){
      
      $('.headerWrap').addClass('on');
      //두가지 조건을 다 만족했을 때만 얘가 실행되어라!
    }else{
      $('.headerWrap').removeClass('on')
    }
  }

  function onMenu(){
    var $headerClass = $('.headerWrap').hasClass('on');
      if(!$headerClass){
        unActiveClass()
        activeClass()
      }
      slideDown()
  }//menuOn

  function outMenu(){
   
    var $headerClass = $('.headerWrap').hasClass('on');
    
    if(!$headerClass){
      unActiveClass()
    }
    slideUp()
    
  }

  function activeClass(){
    $('.logo').addClass('on')
    $(this).parent().addClass('on');
    $mainMenu.addClass('on');
  }
  function unActiveClass(){
    $('.logo').removeClass('on');
      $mainMenu.parent().removeClass('on');
      $mainMenu.removeClass('on');
  }

  function slideDown(){
    $subMenu.stop().slideDown(300);
    $mainBg.stop().slideDown(300)
  }

  function slideUp(){
    $subMenu.stop().slideUp(100);
    $mainBg.stop().slideUp(100)
  }

}    //mainNav

function productEvt(){

  

  //var $visualInner = $('.productWrap').innerWidth();
  // console.log($visualInner) //1400
  var $productUl;
  var $productLi;//li
  var $productSize;
  var $productLiWidth;
  var $productWrap
  var $productWrapWidth
  
  init();
  resetEvent();

  function init(){
    $productWrap = $('.productWrap');
    $productUl = $('.productSlide'); //ul
    $productLi = $productUl.children();
    $productSize = $productUl.children().size();
    $productUl.css({'width' : $productWrap.innerWidth()/3  * $productSize})
    $productLi.css({'width': $productUl.innerWidth()/ $productSize})
    
  }
  
  function resetEvent(){
    $productWrapWidth = $productWrap.innerWidth()
    $productUl.css({'width' : $productWrap.innerWidth()/3  * $productSize});
    $productLi.css({'width':$productWrap.innerWidth()/3 })
    console.log($productWrapWidth)
    console.log($productUl.innerWidth());
    console.log($productLiWidth)
    $productLi.find('img').css({'height': $productLi.innerWidth()})
    $productUl.css({'marginLeft':-$productLi.innerWidth()});
    $productUl.children('li').last().prependTo($productUl);
    
  }
  $(window).on('resize', resetEvent)

  // console.log($productUl.css('width')) //1395px로 ul을 늘려줌


 
 /*
 버튼 슬라이드가 실행되기 전에, 
li앞에 하나의 li를 더 붙여주고, 
marginLeft 100%를 주어 가운데 li가 보이게끔 한다.
그리고서, 버튼 이벤트를 시작한다.
 */


 console.log($productLiWidth);//465px - li길이값
  var currentIndex = $productUl.find('li.on').index()
  

  // 이벤트 시작
  $('#next_btn').on('click', onNextSlide)
  $('#prev_btn').on('click', onPrevSlide)


  // 1. onNextSlide
 function onNextSlide(){
  
   console.log(currentIndex)
   //console.log('5455')
   $productUl.children('li').children('.circle').fadeOut(200)
    $productUl.stop().animate({'marginLeft':-$productLi.innerWidth()*2},500,function(){
    $productUl.children('li').first().appendTo($productUl);
    $productUl.css({'marginLeft':-$productLi.innerWidth()});
    $productUl.children('li').removeClass('on');
    $productUl.children('li').eq(currentIndex).addClass('on')
    $productUl.children('li').eq(currentIndex).children('.circle').show();
    
  });
  
  



  return false;
  // onclick이벤트 없애기 위함


/*
설명 : 

클릭했을 때, marginLeft를 -200%만큼 앞으로 이동해야 다음 값이 보인다.
(현재 -100%만큼 이동해 있으니까!!!)
그 이후에, 맨 앞에 있는 첫번째 요소를 ul의 뒤에 붙여주는데, 이러면 또 마진값이 변경되니까
marginLeft -100%로 다시 자리를 잡아준다.
*/


}; // onNextSlide();



  // 2.  onPrevSlide
  function onPrevSlide(){
    
    console.log(currentIndex)
    $productUl.children('li').children('.circle').fadeOut(200)
    $productUl.stop().animate({'marginLeft' : 0}, 500, function(){
      $productUl.children('li').last().prependTo($productUl);
      $productUl.css({'marginLeft':-$productLi.innerWidth()});
      $productUl.children('li').removeClass('on');
    $productUl.children('li').eq(currentIndex).addClass('on');
    $productUl.children('li').eq(currentIndex).children('.circle').show();
    })

    return false;
      // onclick이벤트 없애기 위함


      
/*
설명 : 

onNextSlide와 같이, 클릭했을 때, marginLeft를 0으로 주어 앞에 있던 값을 보이게 한다.
(현재 -100%만큼 이동해 있으니까!!!  0이 되어야 앞의 요소가 보이는 것, -100이 아님!!!!! )
그 이후에, 맨 뒤에 있는 마지막 요소를 ul의 앞에 붙여주는데, 이러면 또 마진값이 변경되니까
marginLeft -100%로 다시 자리를 잡아준다.
*/


  }; //onPrevSlide();





}// productEvt();

function magazinesHover(){

  var $magazineList= $('.magazineImg').children();
    var $moreBg = $('<div class="magazine_bg">view more</div>');

    $magazineList.on('mouseenter',onMore);
    $magazineList.on('mouseleave',outMore)


    function onMore(){

      $moreBg.appendTo($(this));
      //해당 함수를 실행하기 위해서 이벤트를 발생시킨 대상 
      //onMore라는 함수를 발생시킨 contentList중에서 마우스를 오버한 li
      //마우스를 over한 li를 제외한 다른 li들은 이벤트 대상에서 제외된다. 

    }

    function outMore(){
      $moreBg.remove();
    }
}//contentsHover



function mobileBtn(){

  var isOpen = false;
  $('.mobileNav').css({'opacity':0, 'top':'-100%'})

  $('.mobileBtn').on('click', onMenuActive);

  function onMenuActive(){

    if(isOpen == false){
      $('.line02').addClass('on');
    setTimeout(function(){

      $('.line01').addClass('on');
      $('.line03').addClass('on');
    },150)
    setTimeout(function(){
      $('.mobileBtn a').addClass('on')  //a 클래스인거 잘 확인하기
    },300)

    $('.mobileNav').animate({'opacity':1, 'top':0},500,'easeOutCubic')
    $('html').css({'overflow':'hidden'});


    isOpen = true
  }else if(isOpen == true){
    $('.line01').removeClass('on');
    $('.line02').removeClass('on');
    $('.line03').removeClass('on');
    $('.mobileBtn a').removeClass('on'); //a 클래스인거 잘 확인하기

    $('.mobileNav').animate({'opacity':0, 'top': '-100%'},500,'easeOutCubic')

    $('.mobileNav .mobilesubMenu').slideUp(0);
    $('.mobileNav > ul > li').removeClass('on')

    $('html').css({'overflow':'visible'})

    isOpen = false
  }
}
}


function mobileNav(){

  $('.mobileNav .mobilesubMenu').slideUp(0);
  $('.mobileNav .mobilemainMenu > li').on('click', onSubNav)


  function onSubNav(){
    var isMenu = $(this).children('.mobilesubMenu').is(':hidden');
    //is()는 선택자의 현재상태를 체크해주는 함수다
    $('.mobileNav .mobilemainMenu > li').removeClass('on');
    $(this).addClass('on');

    if(isMenu){
      $('.mobileNav .mobilesubMenu').slideUp(0);
      $(this).children('.mobilesubMenu').slideDown(300);
    }else{
      $('.mobileNav .mobilesubMenu').slideUp(0);
      $('.mobileNav .mobilemainMenu > li').removeClass('on');
    }
   
  }

}
