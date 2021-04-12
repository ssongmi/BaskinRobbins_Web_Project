$(function() {
    // list up down 기능
    var $ul = $(".list > ul");
    var $li = $(".list-item");
    var $upBtn = $(".left > button:first-child");
    var $downBtn = $(".left > button:last-child");
    var $engTit = $(".engTit");
    var $tit = $(".tit");
    var $desc1 = $(".desc > p:nth-child(1)");
    var $desc2 = $(".desc > p:nth-child(2)");
    var $desc3 = $(".desc > p:nth-child(3)");
    var $hash = $(".hash");
    var $thumsBtn = $(".thumbsBtn");
    var $curPhoto = $("#ice");
    var $center = $(".center");
    var $heart = $(".thumbsBtn > span");
    var $navBg = $(".navBg");
    var $navBar = $(".navBar");
    var $navArea = $(".navArea");
    var $name = $("#name");

    var colors = ["#cc1d28", "#9dccc7", "#b4a273", "#cfa0a8", "#f389b0", "#ffedbc", "#b08858", "#5a3d2b", "#f7e8c0"];
    var subColors = ["#d6b1b3", "#d7eae8", "#fceabd", "#ffdde3", "#ffddea", "#fffaef", "#f4d4b0", "#ffd0b5", "#fff5dd"];
    var engtits = ["BERRY", "MINT", "AMOND", "CANDY", "LOVE", "MANGO", "JAMOKA", "CHOCO", "HONEY"];
    var tits = ["베리베리 스트로베리", "민트초콜릿칩", "아몬드 봉봉", "이상한 나라의 솜사탕", "러브미", "알폰소 망고", "자모카 아몬드 훠지", "초코나무 숲", "아이스 허니버터 아몬드"];
    var contents = ["새콤상콤 딸기 과육이 듬뿍!", "쿨한 그녀들의 선택! 상쾌한 민트향에 초코칩까지", "입안 가득 즐거운 초콜릿 아몬드로 가득하게", "부드럽고 달콤한 솜사탕과 함께 떠나는 이상한 나라로의 여행", "딸기 블루베리 바닐라향 아이스크림에 롤리팝 캔디가 쏘옥~", "알폰소 망고와 우유 아이스크림의 부드러운 만남",
        "깊고 풍부한 자모카 아이스크림에 고소한 아몬드와 초콜릿 훠지 시럽!", "2014년 아이스크림 콘테스트 1위 선정작!", "버터 스카치 아이스크림과 바닐라 아이스크림속의 단짠단짠"
    ];
    var subCon = ["봄에는 딸기가 최고", "상쾌! 시원! 치약!", "바삭바삭 과자까지 한꺼번에~", "기분 좋아지는 달콤함!", "달콤상콤한 사랑맛♥", "샤베트 느낌~ with 쫀득한 망고 과육", "스트레스엔 역시 달콤한 초콜릿 훠지", "녹차에서 초콜릿까지 한번에!", "허니버터 아몬드가 쏙쏙!"]
    var hashtag = ["#딸기딸기 #봄봄", "#민초파모여라 #양치까지 한번에", "#아몬드아몬드 #내기분도 봉봉", "#이상한 나라의 앨리스 #그게 바로 나", "#Love you #내가 좋아하는건 너야", "#망고 #milk", "#잠올땐? #자모카", "#담양 #죽녹원", "#한여름밤의 꿀 #곰돌이 푸"];
    var photos = ["berry.png", "mint.png", "bongbong.png", "strange.png", "loveme.png", "mango.png", "jamoka.png", "choco.png", "honey.png"];
    var thumbsFlag = false;
    var curli;

    var curid = localStorage.getItem('curid');
    $name.text(curid);
    $upBtn.on("click", function() {
        $ul.animate({
            marginTop: "-120px"
        }, function() {
            $ul.append($ul.children().eq(0)).css({
                marginTop: "0px"
            });
        });
    });
    $downBtn.on("click", function() {
        $ul.children().eq(8).prependTo($ul);
        $ul.css({
            marginTop: "-120px"
        });
        $ul.animate({
            marginTop: "0px"
        });
    });
    // 클릭했을 때 해당 아이스크림 정보 나오게
    for (var i = 0; i < 9; i++) {
        (function(i) {
            $li.eq(i).on("click", function() {
                $thumsBtn.css({
                    "background-color": "white",
                    "color": "black"
                });
                thumbsFlag = false;
                $heart.css("color", colors[i]);
                curli = i;
                for (var j = 0; j < 9; j++) {
                    $li.eq(j).css("background-color", "white");
                }
                $(this).css("background-color", "#ededed");
                var number = $(this).attr("data-num");
                $engTit.text(engtits[number]);
                $tit.text(tits[number]);
                $desc1.text(contents[number]);
                $desc2.text(subCon[number]);
                $desc3.text(hashtag[number]);
                var newSrc = "./images/" + photos[number];
                $curPhoto.attr("src", newSrc);
                $center.css("background-color", subColors[number]);
                $engTit.css("color", colors[number]);
                $heart.css("color", colors[number]);

                $thumsBtn.on("mouseover", function() {
                    $(this).css({
                        "background-color": colors[number],
                        "color": "white"
                    });
                    $heart.css("color", "white");
                });
                $thumsBtn.on("mouseout", function() {
                    if (!thumbsFlag) {
                        $(this).css({
                            "background-color": "white",
                            "color": "black"
                        });
                        $heart.css("color", colors[number]);
                    }
                });
                // console.log($center);
            });
        })(i);

    } // for
    // 베리베리스트로베리 활성화
    $li.eq(0).trigger("click");

    // 좋아요 버튼 토글
    $thumsBtn.on("click", function() {
        console.log(curli);
        if (thumbsFlag) {
            $(this).css({
                "background-color": "white",
                "color": "black"
            });
            $heart.css("color", colors[curli]);
            console.log(thumbsFlag);
            thumbsFlag = false;
        } else {
            $(this).css({
                "background-color": colors[curli],
                "color": "white"
            });
            $heart.css("color", "white");
            console.log(thumbsFlag);
            thumbsFlag = true;
        }
    });

    // navBar
    $navArea.hover(function() {
        $(this).css("marginTop","-80px");
        $navBar.stop().animate({
            "marginTop": "80px"
        });
        $navBg.stop().animate({
            "marginTop": "80px"
        });
    }, function() {
        $navBar.stop().animate({
            "marginTop": "15px"
        });
        $navBg.stop().animate({
            "marginTop": "15px"
        });
    });

});
