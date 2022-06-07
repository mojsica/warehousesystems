export class HttpUtils {

    static addIdParamToUrl(currentPath: string, id: number | undefined) {
        const pathArray = currentPath.split(';');
        pathArray[0] = pathArray[0] + '/' + id;
        return pathArray.join(';');
    }

    static removeIdParamFromUrl(currentPath: string) {
        const pathArray = currentPath.split(';');
        pathArray[0] = '/' + pathArray[0].split('/')[1];
        return pathArray.join(';');
    }
}