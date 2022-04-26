// Заносим в массив координаты
let custom_points = [
    {
        name: 'Митино',
        coordinates: [55.842033, 37.360291],
        color: 'green',
        square: '10м3',
        region: 'region 1',
        category: 'Полевые сейсморазведочные работы'
    },
    {
        name: 'Точка 1',
        coordinates: [57.501022, 31.893798],
        color: 'green',
        square: '10м3',
        region: 'region 1',
        category: 'Камеральные работы'
    },
    {
        name: 'Точка 2',
        coordinates: [62.750162, 48.593016],
        color: 'blue',
        square: '20м3',
        region: 'region 2',
        category: 'Супервайзинг'
    },
    {
        name: 'Точка 3',
        coordinates: [61.766951, 71.093016],
        color: 'yellow',
        square: '30м3',
        region: 'region 3',
        category: 'Перспективные проекты'
    },
    {
        name: 'Точка 4',
        coordinates: [56.736082, 99.569579],
        color: 'grey',
        square: '40м3',
        region: 'region 4',
        category: 'Строительство площадок под буровые скважины'
    },
    {
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae in eget orci eu elit. Viverra morbi mattis neque arcu, hendrerit',
        coordinates: [45.652409, 97.811766],
        color: 'black',
        square: '726 пог.км',
        region: 'Красноярский край',
        category: 'Перспективные проекты'
    }
];


var myMap;
// Массив морей
const sea_array = [
    {
        name: 'Баренцево море',
        coordinates: [74.406532, 41.324173]
    },
    // {
    //     name: 'Норвежское море',
    //     coordinates: [67.272233, -0.160202]
    // },
    // {
    //     name: 'Северное море',
    //     coordinates: [56.346310, 3.179642]
    // },
    {
        name: 'Черное море',
        coordinates: [43.259067, 33.853470]
    },
    {
        name: 'Каспийское море',
        coordinates: [41.954357, 50.436427]
    },
    {
        name: 'Японское море',
        coordinates: [40.180246, 133.319579]
    },
    {
        name: 'Охотское море',
        coordinates: [53.051505, 148.964110]
    },
    {
        name: 'Берингово море',
        coordinates: [57.699300, 174.628173]
    },
    {
        name: 'Чукотское море',
        coordinates: [75.082696, -169.727296]
    },
    {
        name: 'Море Лаптевых',
        coordinates: [77.009097, 125.321532]
    },
    {
        name: 'Карское море',
        coordinates: [79.115107, 82.958251]
    }
]
ymaps.ready(init);
// Переменная для сдвига спрайт картинки
let iconImageClipRect = '';

let centerMap;

if ($(window).width() < 768) {
    centerMap = 100;
} else {
    centerMap = 125;
}

function init() {
    // Меняем зум для мобильной версии
    // let zoom;
    // if(document.documentElement.clientWidth < 768) {
    //     zoom = 2;
    // } else {
    //     zoom = 3;
    // }

    myMap = new ymaps.Map(
        'map', {
            // center: [65, 105],
            center: [65, centerMap],
            // zoom: zoom,
            zoom: 3,
            // type: null,
            type: 'yandex#map',
            // controls: ['zoomControl']
            controls: []
        }, {
            suppressMapOpenBlock: true, // Отключить предложение открыть на сайте яндекс
            autoFitToViewport: true, // Автоматически подстраивает карту под контейнер
            // restrictMapArea: true
            // Устанавливает область просмотра карты так, чтобы пользователь не мог выйти за пределы этой области
            // Если включить этот параметр - автоподстроение карты под точки не работает
        }
    );

    // ОТКЛЮЧАЕМ СКРОЛЛ КОЛЕСОМ И ДВОЙНЫМ КЛИКОМ
    myMap.behaviors.disable('scrollZoom');
    // myMap.behaviors.disable('drag');

    // ДОБАВЛЯЕМ БЕЛЫЙ ФОН НА КАРТУ
    var pane = new ymaps.pane.StaticPane(myMap, {
        zIndex: 100, css: {
            width: '100%', height: '100%', background: 'linear-gradient(153deg, rgb(193, 221, 255) -50%, rgb(236, 245, 255) 110%)'
        }
    });
    myMap.panes.append('white', pane);

    // Создаём макет содержимого для Моря
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        `<div style="font-family:Rubik, sans-serif; font-size: 12px; color:#225BA5; font-weight:500; word-break: break-word; text-align:center; min-width: 70px;">$[properties.iconContent]</div>`
    )

    // ДОБАВЛЯЕМ МОРЯ НА КАРТУ
    for (let sea in sea_array){
        // Добавляем море на карту
        seaPlacemark = new ymaps.Placemark(sea_array[sea].coordinates , {
            iconContent: sea_array[sea].name,
            openBalloonOnClick: false
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Размеры метки.
            iconImageSize: [1, 1],
            iconImageOffset: [-40, -10],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
        myMap.geoObjects.add(seaPlacemark);
    }

    // ДОБАВЛЯЕМ ПОЛЬЗОВАТЕЛЬСКИЕ ТОЧКИ НА КАРТУ
    for (let point in custom_points){
        switch (custom_points[point].color) {
            case 'green':
                iconImageClipRect = [[0, 0], [37, 49]]
                break;
            case 'blue':
                iconImageClipRect = [[37, 49], [73, 98]]
                break;
            case 'yellow':
                iconImageClipRect = [[73, 98], [110, 147]]
                break;
            case 'grey':
                iconImageClipRect = [[110, 147], [147, 196]]
                break;
            case 'black':
                iconImageClipRect = [[147, 196], [183, 245]]
                break;
        }
        // Добавляем море на карту
        placemark = new ymaps.Placemark(custom_points[point].coordinates , {
            hintContent: custom_points[point].category,
            balloonContentHeader: custom_points[point].name,
            balloonContentBody: custom_points[point].square,
            balloonContentFooter: custom_points[point].region
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Изображение спрайт
            iconImageHref: 'assets/images/sprite_new.png',
            // Сдвиг спрайта
            iconImageClipRect: iconImageClipRect,
            // Размеры метки.
            iconImageSize: [20, 25],
            iconImageOffset: [0, 0],
            openBalloonOnClick: false,
            openHintOnHover: false
        });

        // Выводим POPUP при клике на точку
        placemark.events.add('click', function(e) {
            let placemark = e.get('target')
            // console.log('placemark info: ', placemark.properties.getAll());
            // placemark.options.set({
            //     iconImageSize: [40, 50],
            //     iconImageOffset: [0, 0]});
            $('#popup').remove();
            $('#map_container').append($('#map_popup').html());

            $('#text_category').html(placemark.properties.get('hintContent'));
            $('#text_name').html(placemark.properties.get('balloonContentHeader'));
            $('#text_square').html(placemark.properties.get('balloonContentBody'));
            $('#text_region').html(placemark.properties.get('balloonContentFooter'));


            // Закрываем POPUP
            $('#popup_close').on('click', function() {
                $('#popup').remove();
            });
        });



        myMap.geoObjects.add(placemark);
    }

    ymaps.regions.load('001', {
        lang: 'ru',
        quality: 2
    }).then(function(result) {
        var regions = result.geoObjects;

        result.geoObjects.events.add('click', function(e) {
            var region = e.get('target');
            console.log(region.properties.get('name') + ' -> ' + region.properties.get('osmId'));
        });

        regions.each(function(reg) {
            // 161033 - Монголия
            // 270056 - Китайская Народная Республика
            // 60189 - Россия

            // См. опции регионов тут:
            // https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#GeoObject__param-options.fill

            let ID = +reg.properties.get('osmId');

            // Красим монголию в красный
            if(ID==161033) {
                reg.options.set('fillColor', '#FD6666');
                reg.options.set('strokeWidth', 0);
            // Остальные регионы - в белый
            } else {
                reg.options.set('fill', false);
                reg.options.set('hasHint', false);
                reg.options.set('strokeWidth', 0);
                // reg.options.set('cursor', 'default');
            }
        });

        myMap.geoObjects.add(regions);
    }, function() {
        alert('No response');
    });

    ymaps.regions.load('RU', {
        lang: 'ru',
        quality: 1
    }).then(function(result) {
        var regions = result.geoObjects;

        regions.each(function(reg) {
            reg.options.set('preset', {
                fill: true,
                strokeWidth: 0.5,
                fillColor: '225BA5',
                strokeColor: 'FFF',
                cursor: 'pointer'
            });
        });

        result.geoObjects.events.add('click', function(e) {
            var region = e.get('target');
            console.log(region.properties.get('name') + ' -> ' + region.properties.get('osmId'));

            if(region.active != true){
                region.active = true;
                region.options.set('fillColor', '#3EACE9');
            } else {
                region.active = false;
                region.options.set('fillColor', '#225BA5');
            }
        });

        // Добавляем регионы на карту
        myMap.geoObjects.add(regions);
    }, function() {
        alert('No response');
    });

    // Масштабируем и выравниваем карту так, чтобы были видны метки для выбранного города
    // zoomMargin - отступы от края карты до метки, then - установка оптимального масштаба для одиночных меток
    // myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin:100 }).then(function(){ if(myMap.getZoom() > 16) myMap.setZoom(16)});
    ymapsTouchScroll(myMap, {preventScroll: true, preventTouch: true});
}
