/**
 * Created by Liudq on 2019-08-13
 */
import {CoursePlanItem} from './CoursePlanItem';

export class OwnedCoursePlanItem {
    constructor(ownedCoursePlanItemInfo){
        this.coursePlanItem = new CoursePlanItem(ownedCoursePlanItemInfo);
    }
    getModule(repairParam){
        return Object.assign({},this.coursePlanItem.getModule(),repairParam);
    }
}