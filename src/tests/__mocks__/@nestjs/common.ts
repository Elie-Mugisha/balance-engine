export function Injectable(): ClassDecorator {
  return (target) => target;
}

export function SetMetadata<K = string, V = any>(_metadataKey: K, _metadataValue: V): MethodDecorator & ClassDecorator{
  return () => { };
}