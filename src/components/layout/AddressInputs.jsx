export default function AddressInputs({addressProps, setAddressProp, disabled=false}){
    const {phone, streetAddress, zipCode, city, country} = addressProps;
    return(
        <>
            <label htmlFor="phone">Phone number</label>
                <input
                    disabled={disabled}
                    type="tel"
                    id="phone"
                    placeholder="Phone number"
                    value={phone || ''}
                    onChange={ev => setAddressProp('phone', ev.target.value)}
                />
                <label htmlFor="address">Street Address</label>
                <input
                    disabled={disabled}
                    type="text"
                    id="address"
                    placeholder="Street address"
                    value={streetAddress || ''}
                    onChange={ev => setAddressProp('streetAddress', ev.target.value)}
                />
                <div className="grid grid-cols-2 gap-x-4">
                    <div >
                        <label htmlFor="city">City</label>
                        <input
                            disabled={disabled}
                            type="text"
                            id="city"
                            placeholder="City"
                            value={city || ''}
                            onChange={ev => setAddressProp('city', ev.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="zipcode">Zip code</label>
                        <input
                            disabled={disabled}
                            type="text"
                            id="zipcode"
                            placeholder="Postal Code"
                            value={zipCode || ''}
                            onChange={ev => setAddressProp('zipCode', ev.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor="country">Country</label>
                <input
                    disabled={disabled}
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={country || ''}
                    onChange={ev => setAddressProp('country', ev.target.value)}
                />
        </>
    )
}