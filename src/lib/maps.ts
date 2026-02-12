export type BranchLocation = {
  name: string;
  city: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
};

export function getDestinationLabel(location: BranchLocation) {
  return `${location.city}, ${location.address} (${location.name})`;
}

export function get2GisRouteUrl(location: BranchLocation) {
  if (location.latitude != null && location.longitude != null) {
    return `https://2gis.kz/routeSearch/rsType/car/to/${location.longitude},${location.latitude}`;
  }
  return `https://2gis.kz/search/${encodeURIComponent(getDestinationLabel(location))}`;
}

export function getGoogleRouteUrl(location: BranchLocation) {
  if (location.latitude != null && location.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getDestinationLabel(location))}`;
}

