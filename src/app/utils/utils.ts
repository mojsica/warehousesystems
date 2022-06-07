export class Utils {

    static cleanKeys(obj: any) {
        const res = { ...obj };
        Object.keys(res).forEach(key => {
            if (!res[key]) delete res[key];
        })
        return res;
    }

}