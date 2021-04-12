$(function(){
    var $id = $("input").eq(0);
    var $pwd = $("input").eq(1);
    var $joinBtn = $("#join");
    var $logBtn = $("#login");
    var idArr;
    var pwdArr;
    function makeList(){
        var id = localStorage.getItem('id');
        var pwd = localStorage.getItem('pwd');
        if(id== null | pwd == null){
            localStorage.setItem('id', JSON.stringify([]));
            localStorage.setItem('pwd', JSON.stringify([]));
        }else{
            idArr = JSON.parse(id);
            pwdArr = JSON.parse(pwd);
        }
    }

    // 아이디 체크 비밀번호 체크
    // 아이디랑 비밀번호중에서 하나라도 빈칸이 있으면 로그인이든 가입이든 안됨
    $joinBtn.on("click",function(){
        makeList();
        if(check() & isValidated()){
            // 잘 입력이 된 경우
            // 모달 창을 띄우고
            $(this).attr("data-target","#myModal").attr("data-toggle","modal");

            // 아이디를 로컬 스토리지에 넣기 위해서 리스트에 일단 넣고
            idArr.push($id.val());
            // 비밀번호도 넣고
            pwdArr.push($pwd.val());
            // 마지막에 로컬 스토리지로 넣기
            localStorage.setItem('id', JSON.stringify(idArr));
            localStorage.setItem('pwd', JSON.stringify(pwdArr));
        }
    });
    $logBtn.on("click",function(){
        // 로그인을 하려고 하는데
        makeList();
        var curidx;
        // 현재 아이디가 아이디 배열에 몇번째 인덱스에 있는지 찾고
        $.each(idArr, function(index){
            if(idArr[index] == $id.val()){
                curidx = index;
                return false;
            }
        });
        // 패스워디 배열의 그 인덱스와 현재 입력한 패스워드가 같으면
        if(pwdArr[curidx] == $pwd.val()){
            // 로그인 시켜주고 다음 창으로 넘겨줌
            localStorage.setItem('curid', $id.val());
            window.location.href="./main.html";
        }else{
            // 만약에 같지 않으면 비밀번호가 틀렸다고 알려줌
            $pwd.next().text("비밀번호가 틀렸습니다.").removeClass("invisible");
        }

    });
    // 로그인하려고 했는데 아이디가 등록되어 있지 않으면 안됨
    // 로그인할 때 아이디에 해당하는 비밀번호가 틀리면 안됨
    // 가입할 때 아이디 중복 안됨
    // 아이디 중복 아니면 가입됨
    function check(){
        var flag = true;
        console.log($id.val());
        $id.next().addClass("invisible");
        $pwd.next().addClass("invisible");
        if($id.val().length == 0){
            $id.next().text("이름을 입력해주세요").removeClass("invisible");
            flag = false;
        }
        if($pwd.val().length == 0){
            $pwd.next().text("비밀번호 입력해주세요").removeClass("invisible");
            flag = false;
        }
        return flag;
    }
    // 아이디 중복 검사
    function isValidated(){
        var flag = true;
        $.each(idArr,function(index){
            console.log(idArr[index]);
            if(idArr[index] == $id.val()){
                // 중복된 경우
                $id.next().text("중복된 아이디입니다.").removeClass("invisible");
                flag = false;
            }
        });
        return flag;
    }
});
