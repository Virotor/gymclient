import dayjs from 'dayjs';


export interface IGroup {
    id : number,
    groupNumber: string,
    groupType: string,
    groupAgeType: string,
    gropSkillType: string,

}


export function getGroupType (birthDay : Date) {
    let age = dayjs(new Date()).diff(dayjs(birthDay), 'years') 
    switch (true){
        case (age>0 && age<12) : return 'Child'
        case (age>13 && age<16) : return 'Teen'
        case (age>17 && age<21) : return 'Youth'
        case (age>22 && age<50) : return 'Adult'
        case (age>51 ) : return 'Old'
        default : return 'Unknow'
    }
}


export const groupSkillType = ['Beginner', 'Amateur', 'Professional', 'Master']