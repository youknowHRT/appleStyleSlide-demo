let $buttons=$('#buttonWrapper>button')
let $slides=$('#slides')
let $images=$slides.children('img')
let current=0

makeFakeSlides()
$slides.css({transform:'translateX(-600px)'})
bindEvents()

//控制前后滚动
$(previous).on('click',function(){
    goToSlide(current-1)
})
$(next).on('click',function(){
    goToSlide(current+1)
})

// 自动播放
let timer = setInterval(function(){
    goToSlide(current+1)
},3000)
//悬浮暂停
$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    setInterval(function(){
        goToSlide(current+1)
    },3000)
})

// function addButtonColor(){
    
// }


function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button=$(e.currentTarget)
        let index=$button.index()
        goToSlide(index)
    })
}

function goToSlide(index){
    if(index>$buttons.length-1){
        index=0
    }else if(index<0){
        index=$buttons.length-1
    }
    if(current===$buttons.length-1 && index===0){
        $slides.css({transform:`translateX(${-($buttons.length+1)*600}px)`})
        .one('transitionend',function(){
            $slides.hide()
            .offset()
            $slides.css({transform:`translateX(${-(index+1)*600}px)`})
            .show()
        })
    }else if(current===0 && index===$buttons.length-1){
        $slides.css({transform:'translateX(0px)'})
        .one('transitionend',function(){
            $slides.hide()
            .offset()
            $slides.css({transform:`translateX(${-(index+1)*600}px)`})
            .show()
        })
    }else{
        $slides.css({transform:`translateX(${-(index+1)*600}px)`})
    }
    current=index
    
}


// 在两端添加假图
function makeFakeSlides(){
    let $firstCopy=$images.eq(0).clone(true)
    let $lastCopy=$images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}