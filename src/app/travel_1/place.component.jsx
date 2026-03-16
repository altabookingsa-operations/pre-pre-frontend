import React, { useEffect, useRef } from 'react';
import { StandaloneSearchBox, LoadScriptNext } from '@react-google-maps/api';
import { useSearchParams } from 'next/navigation';
import { setToast, toastConfig } from '../../utils/commonUtil';

const libraries = ['drawing', 'places'];

const restrictedCountries = [
  { shortName: 'RU', longName: 'Russia' },
  { shortName: 'AF', longName: 'Afghanistan' },
  { shortName: 'AO', longName: 'Angola' },
  { shortName: 'BY', longName: 'Belarus' },
  { shortName: 'CF', longName: 'Central African Republic' },
  { shortName: 'CD', longName: 'Democratic Republic of the Congo' },
  { shortName: 'CU', longName: 'Cuba' },
  { shortName: 'IR', longName: 'Iran' },
  { shortName: 'IQ', longName: 'Iraq' },
  { shortName: 'LY', longName: 'Libya' },
  { shortName: 'MM', longName: 'Myanmar (Burma)' },
  { shortName: 'KP', longName: 'North Korea' },
  { shortName: 'SO', longName: 'Somalia' },
  { shortName: 'SY', longName: 'Syria' },
  { shortName: 'VE', longName: 'Venezuela' },
  { shortName: 'YE', longName: 'Yemen' },
  { shortName: 'ZW', longName: 'Zimbabwe' },
  // Add any other restricted countries here
];

const isRestrictedLocation = addressComponents => {
  for (const component of addressComponents) {
    for (const type of component.types) {
      const match = restrictedCountries.find(
        country =>
          (type === 'country' && component.short_name === country.shortName) ||
          component.long_name === country.longName
      );
      if (match) return true;
    }
  }
  return false;
};

const PlaceComponent = ({
  onChange,
  onBlur,
  placeholderText,
  setFieldValue,
  setLocation,
  defaultValue,
  setPlaceId,
  id,
  type,
  Location,
  name,
  setName,
  latLngName,
  defaultValueTrip,
  typeForField,
  setAddressTrip,
  className,
  onKeyPress,
  setLocationTypePick,
  setCountryCode,
  setError,
}) => {
  const inputRef = useRef();
  const searchParams = useSearchParams();

  // Only run once on mount to extract lat/lng from URL search params
  useEffect(() => {
    if (!searchParams) return;

    const pickUpLatLng = searchParams.get('pickUpLatLng');
    const dropOffLatLng = searchParams.get('dropOffLatLng');

    setFieldValue('pickUpLatLng', pickUpLatLng ? JSON.parse(pickUpLatLng) : '');
    setFieldValue('dropOffLatLng', dropOffLatLng ? JSON.parse(dropOffLatLng) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (!place) return;

    const {
      address_components: addressComponents,
      formatted_address,
      geometry,
      name,
      place_id,
      types,
    } = place;

    if (isRestrictedLocation(addressComponents)) {
      toastConfig.type = 'error';
      setToast(
        toastConfig,
        "Oops! You can't use this address at the moment. Sorry for the inconvenience."
      );
      setFieldValue(id, '');
      setLocation('');
      return;
    }

    const latLng = {
      Latitude: geometry?.location?.lat(),
      Longitude: geometry?.location?.lng(),
    };
    switch (type) {
      case 'pick':
        setFieldValue('pickUpLocation', formatted_address);
        setFieldValue('pickUpName', name);
        setFieldValue('pickUpLatLng', latLng);
        setFieldValue('locationTypePick', types[0]);
        setPlaceId(place_id);
        setLocation(formatted_address);
        setCountryCodeFromAddress(addressComponents);
        setError?.(false);
        break;
      case 'airportTransferPick':
        setFieldValue('cLocation', name);
        if (types.includes('airport')) setFieldValue('name', name);
        setFieldValue('pickup_locatiion', `${name}, ${formatted_address}`);
        // setFieldValue("pickUpName", name);
        // setFieldValue("pickUpLatLng", latLng);
        setFieldValue('fromAirportLatLng', latLng);
        setFieldValue('locationTypePick', types[0]);
        setFieldValue('start_place_id', place_id);
        setLocationTypePick(types.includes('airport') ? 'airport' : types[0]);
        // setPlaceId(place_id);
        setLocation(`${name}, ${formatted_address}`);
        setCountryCodeFromAddress(addressComponents);
        setError?.(false);
        break;
      case 'airportTransferdrop':
        setFieldValue('dLocation', name);
        if (types.includes('airport')) setFieldValue('name', name);
        setFieldValue('drop_off_location', `${name}, ${formatted_address}`);
        // setFieldValue("dropOffName", name);
        // setFieldValue("dropOffLatLng", latLng);
        setFieldValue('toAirportLatLng', latLng);

        console.log(' types[0]', types[0]);
        setFieldValue('locationTypeDrop', types[0]);
        setLocationTypePick(types.includes('airport') ? 'airport' : types[0]);
        setFieldValue('end_place_id', place_id);
        setPlaceId(place_id);
        setLocation(`${name}, ${formatted_address}`);
        setError?.(false);
        break;

      case 'drop':
        setFieldValue('dropLocation', formatted_address);
        setFieldValue('dropOffName', name);
        setFieldValue('dropOffLatLng', latLng);
        setFieldValue('locationTypeDrop', types[0]);
        setPlaceId(place_id);
        setLocation(formatted_address);
        setError?.(false);
        break;

      case 'tranfer':
        setFieldValue(id, formatted_address);
        if (latLngName === 'dropOffLatLng') {
          setFieldValue('dropOffLatLng', latLng);
          setFieldValue('locationTypeDrop', types[0]);
        } else if (latLngName === 'pickUpLatLng') {
          setFieldValue('pickUpLatLng', latLng);
          setFieldValue('locationTypePick', types[0]);
          setLocationTypePick?.(types[0]);
        }
        setLocation(formatted_address);
        setPlaceId(place_id);
        setName(name);
        setCountryCodeFromAddress(addressComponents);
        break;

      case 'tranferpick':
        setFieldValue('pickUpLocation', name);
        if (types.includes('airport')) setFieldValue('name', name);
        if (latLngName === 'dropOffLatLng') {
          setFieldValue('dropOffLatLng', latLng);
          setFieldValue('locationTypeDrop', types.includes('airport') ? 'airport' : types[0]);
          setLocationTypePick &&
            setLocationTypePick(types.includes('airport') ? 'AIRPORT' : types[0]);
        } else if (latLngName === 'pickUpLatLng') {
          setFieldValue('pickUpLatLng', latLng);
          setFieldValue('locationTypePick', types.includes('airport') ? 'airport' : types[0]);
          setLocationTypePick &&
            setLocationTypePick(types.includes('AIRPORT') ? 'airport' : types[0]);
        } else if (latLngName === 'pickUpLatLngHourly') {
          setFieldValue('pickUpLatLng', latLng);
          setFieldValue('locationTypeDrop', types[0]);
          setFieldValue('locationTypePick', types[0]);
          setFieldValue('dropOffLatLng', latLng);
        }
        setLocation(`${name}, ${formatted_address}`);
        setPlaceId(place_id);
        // setName(name);
        setCountryCodeFromAddress(addressComponents);
        break;
      case 'tranferdrop':
        setFieldValue('dropLocation', name);
        if (types.includes('airport')) setFieldValue('name', name);
        if (latLngName === 'dropOffLatLng') {
          setFieldValue('dropOffLatLng', latLng);
          setFieldValue('locationTypeDrop', types[0]);
        } else if (latLngName === 'pickUpLatLng') {
          setFieldValue('pickUpLatLng', latLng);
          setFieldValue('locationTypePick', types[0]);
          // setLocationTypePick?.(types[0]);
        }
        // setLocation(name);
        setLocation(`${name}, ${formatted_address}`);
        setPlaceId(place_id);
        // setName(name);
        // setCountryCodeFromAddress(addressComponents);
        break;

      case 'tripPlan':
        if (typeForField === 'startP') {
          setFieldValue('tripStartPoint', name);
          setAddressTrip(formatted_address);
          setFieldValue('tripStartLatLng', {
            start_lat: latLng.Latitude,
            start_lon: latLng.Longitude,
          });
          setCountryCodeFromAddress(addressComponents, 'startcountry_code');
        } else if (typeForField === 'endP') {
          setFieldValue('tripEndPoint', name);
          setAddressTrip(formatted_address);
          setFieldValue('tripEndLatLng', {
            end_lat: latLng.Latitude,
            end_lon: latLng.Longitude,
          });
          setCountryCodeFromAddress(addressComponents, 'endcountry_code');
        }
        break;

      default:
        break;
    }
  };

  const setCountryCodeFromAddress = (addressComponents, field = null) => {
    for (const component of addressComponents) {
      if (component?.types?.includes('country')) {
        setFieldValue(field || 'countryCode', component?.short_name);
        setCountryCode(component?.short_name);
        break;
      }
    }
  };
  const handleChange = e => {
    onChange(e);
    if (!e?.target?.value?.length) setLocation('');
    else setLocation(e?.target?.value);
    setPlaceId('');
    setError?.(false);
  };
  return (
    // <LoadScriptNext
    //   libraries={libraries}
    //   id="script-loader"
    //   googleMapsApiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE}
    //   loadingElement={<>Loading...</>}
    // >
    <StandaloneSearchBox
      onLoad={ref => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
      options={{
        types: ['establishment'],
        fields: [
          'formatted_address',
          'geometry.location',
          'name',
          'place_id',
          'address_components',
        ],
      }}
    >
      <input
        onChange={handleChange}
        onBlur={onBlur}
        id={id}
        type="text"
        // defaultValue={
        //   type === "tranfer"
        //     ? name
        //     : defaultValue || defaultValueTrip || Location
        // }
        value={
          // This makes the input field controlled, ensuring it updates immediately
          type === 'tranfer'
            ? name
            : type === 'pick'
              ? defaultValue
              : type === 'drop'
                ? defaultValue
                : type === 'tripPlan'
                  ? defaultValueTrip
                  : Location
        }
        className={className || 'form-control'}
        placeholder={placeholderText}
        onKeyPress={onKeyPress}
      />
    </StandaloneSearchBox>
    // </LoadScriptNext>
  );
};

export default React.memo(PlaceComponent);
