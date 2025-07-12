// 穴埋め形式です。空いている箇所を埋めて実装してください

$(function () {
  /*=================================================
  Loading画面
  ===================================================*/
    const finishLoading = function () {
      $('.loading').fadeOut(800, function () {
        $('.main-content').fadeIn(500);
      });
    };
  
    const scrollToHash = function () {
      const hasHash = window.location.hash;
      console.log("hash:", hasHash);
  
      if (hasHash) {
        $('.loading').hide();
        $('.main-content').show();
        const target = $(hasHash);
        if (target.length) {
          const position = target.offset().top - 80;
          $('html, body').scrollTop(position);
        }
      } else {
        finishLoading();
      }
    };
  
    // loadがうまくいけばそれでOK
    $(window).on('load', function () {
      console.log("✅ on load 実行");
      clearTimeout(fallbackTimer);
      scrollToHash();
    });
  
    // 万が一 load が動かなかったときの保険
    const fallbackTimer = setTimeout(function () {
      console.warn("⚠️ loadイベントが発火しなかったので強制実行");
      scrollToHash();
    }, 3000); // 3秒待っても動かなければ強制表示
  });
  

$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".toggle-btn").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時、ナビ非表示
  $("nav").on("click", function () {
    $("header").removeClass("open");
  });

  // マスクをクリックした時、ナビ非表示
  $(".mask").on("click", function () {
    $("header").removeClass("open");
  });

  /*=================================================
  1日のせいかつのトグルボタン
  ===================================================*/
  $(function () {
    function setupToggle() {
        const windowWidth = $(window).width();

        if (windowWidth <= 920) {
            // トグルボタンの動作を初期化
            $('.life__toggle-btn .btn').off('click').on('click', function () {
                $('.life__toggle-btn .btn').removeClass('show');
                $(this).addClass('show');

                const target = $(this).hasClass('baby') ? 'baby' : 'kids';
                $('.life__flex--item').removeClass('active');
                $('.life__flex--item.' + target).addClass('active');
            });

            // 初期状態（乳児を表示）
            $('.life__toggle-btn .btn').removeClass('show');
            $('.life__toggle-btn .btn.baby').addClass('show');

            $('.life__flex--item').removeClass('active');
            $('.life__flex--item.baby').addClass('active');
        } else {
            // PCは全部表示
            $('.life__flex--item').addClass('active');
            $('.life__toggle-btn .btn').removeClass('show');
        }
    }

    setupToggle();

    // リサイズ対応（デバウンスしてもOK）
    $(window).on('resize', function () {
        setupToggle();
    });
});

  /*=================================================
  PICK UP スライダー
  ===================================================*/
  // カルーセル用 jQueryプラグイン「slick」の設定
  // マニュアル：https://kenwheeler.github.io/slick/
  $(".photo__slick").slick({
    centerMode: true,                 //両端見切れ状態の有無
    centerPadding: "100px",           //見切れコンテンツの幅サイズ
    slidesToShow: 3,                  //1スライダーの表示数
    autoplay: true,                   //自動再生の有無
    autoplaySpeed: 3000,              //再生速度（1000=1秒）
    prevArrow: '<div class="slick-arrow slick-prev"></div>',
    nextArrow: '<div class="slick-arrow slick-next"></div>',
    responsive: [
      {
        breakpoint: 920,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
    ],
  });

    // カスタムボタンで操作
    $('.slick-prev').on('click', function () {
      $('.photo__slick').slick('slickPrev');
  });

  $('.slick-next').on('click', function () {
      $('.photo__slick').slick('slickNext');
  });
  
  /*=================================================
  TOPへ戻る
  ===================================================*/
  const $backToTop = $('#js-back-to-top');

  // スクロールイベント
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 700) {
      $backToTop.addClass('is-show');
    } else {
      $backToTop.removeClass('is-show');
    }
  });

  // スムーススクロール
  $backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });


  /*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内のリンクをクリックした時に動作する
  $('a[href^="#"]').click(function () {
    // クリックしたaタグのリンクを取得
    let href = $(this).attr("href");
    // console.log(href);
    // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
    let target = $(href == "#" || href == "" ? "html" : href);
    // ページトップからジャンプ先の要素までの距離を取得
    let position = target.offset().top - 80;
    // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
    // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
    let speed = 600;
    $("html, body").animate({ scrollTop:  position}, speed, "swing");
    //ナビとマスク解除
    $("header").removeClass("open");
    // urlが変化しないようにfalseを返す
    return false;
  });

  
  /*=================================================
  Inview（画面に表示されたタイミングで処理を実行）
  ===================================================*/
  $(window).scroll(function () {

    $(".js-fade").each(function () {

      var scroll = $(window).scrollTop();

      var target = $(this).offset().top;

      var windowHeight = $(window).height();

      if (scroll > target - windowHeight + $(this).outerHeight()) {
        // outerHeight()はpaddingを含めた高さを取得する
        $(this).addClass("is-show");
      }
    });
  });

  /*=================================================
  アコーディオン
  ===================================================*/
  $('.title').on('click', function() {
    $(this).next('.box').slideToggle();
    $(this).toggleClass('close');
  });

});






