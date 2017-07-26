module.exports = [{
    id:'greetings',
    name: 'ABOUT',
    subMenu: [{
        id:'greetings',
        name: '인사말'
    },{
        id:'artGallery',
        name: '미술관소개',
        subSub: [{
            id:'artGallery',
            name: '·미술관소개'
        },{
            id:'artGallery2',
            name: '·MI소개'
        }]
    },{
        id:'facilities',
        name: '시설안내',
        subSub: [{
            id:'facilities',
            name: '·주요시설'
        },{
            id:'facilities2',
            name: '·부대시설'
        }]
    }]
},{
    id: 'preview',
    name: 'VISIT',
    subId: 'visit',
    subMenu: [{
        id:'preview',
        name: '관람안내',
        subId: 'visit'
    },{
        id:'com',
        name: '오시는길',
        subId: 'visit'
    }]
},{
    id: 'exhibition',
    name: 'EXHIBITION',
    subId: 'exhibition'
},{
    id: 'notice',
    name: 'NOTICE',
    subId: 'notice'
},{
    id: 'pressRelease',
    name: 'BOARD',
    subId: 'board',
    subMenu: [{
        id:'pressRelease',
        name: '언론보도',
        subId: 'board'
    },{
        id:'referenceRoom',
        name: '자료실',
        subId: 'board'
    },{
        id:'event',
        name: '공연 및 이벤트',
        subId: 'board'
    }]
}];
    
    