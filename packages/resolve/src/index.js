import module from 'node:module';
import { fileURLToPath } from 'node:url';
const resolver = 'resolve' in import.meta
    ? (path, from) => fileURLToPath(import.meta.resolve(path, from))
    : 'url' in import.meta
        ? (path, from) => new URL(path, import.meta.url).pathname
        : require.resolve;
const resolverV2 = (path, from) => {
    const require = module.createRequire(from);
    const importPath = require.resolve(path, { paths: [from] });
    return importPath;
};
export const resolvePath = (path, from) => {
    // We might be able to use resolverV2 directly, but here we'll still try to use the original implementation first in case there're any issues with the new one.
    try {
        return resolver(path, from);
    }
    catch (e) {
        return resolverV2(path, from);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEMsTUFBTSxRQUFRLEdBQ1osU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJO0lBQ3RCLENBQUMsQ0FBQyxDQUFDLElBQVksRUFBRSxJQUFhLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSTtRQUNwQixDQUFDLENBQUMsQ0FBQyxJQUFZLEVBQUUsSUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRO1FBQzFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFBO0FBRXZCLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDM0QsT0FBTyxVQUFVLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLElBQWEsRUFBVSxFQUFFO0lBQ2pFLCtKQUErSjtJQUMvSixJQUFJLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDL0IsQ0FBQztBQUNILENBQUMsQ0FBQSJ9