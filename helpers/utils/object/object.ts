class ObjectUtils {
  static cloneInstance(instance: any) {
    return Object.assign(
      Object.create(Object.getPrototypeOf(instance)),
      instance
    );
  }
}

export default ObjectUtils;
