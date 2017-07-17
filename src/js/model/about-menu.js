module.exports = [{
    id: 'greetings',
    aboutMenu: '인사말'
},{
    id: 'artGallery',
    aboutMenu: '미술관소개',
    aboutMenuSub: [{
        id: 'artGallery',
        aboutMenuSub: '미술관소개'
    },{
        id: 'artGallery2',
        aboutMenuSub: 'MI소개'
    }]
},{
    id: 'facilities',
    aboutMenu: '시설안내',
    aboutMenuSub: [{
        id: 'facilities',
        aboutMenuSub: '주요시설',
            aboutMenuSubSub: [{
            id: 'facilities',
            aboutMenuSubSub: '미술관 전경'
        },{
            id: 'facilities1',
            aboutMenuSubSub: '층별 안내'
        }]
    },{
        id: 'facilities2',
        aboutMenuSub: '부대시설',
            aboutMenuSubSub:[{
            id:'facilities2',
            aboutMenuSubSub: '흥선대원군 별서'
        },{
            id:'facilities2-2',
            aboutMenuSubSub: 'MATRIX HALL'
        },{
            id:'facilities2-3',
            aboutMenuSubSub: 'TEXTUS HALL'
        },{
            id:'facilities2-4',
            aboutMenuSubSub: 'MUSEUM SHOP'
        },{
            id:'facilities2-5',
            aboutMenuSubSub: 'MUSEUM CAFE'
        }]
    }]
}];