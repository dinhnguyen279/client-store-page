import { useState, useEffect } from "react";
import axios from "axios";

function SelectionForm(props) {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            )
            .then((response) => {
                setCities(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedCity !== "") {
            const districtsInSelectedCity = cities.find(
                (city) => city.Id === selectedCity
            ).Districts;
            setDistricts(districtsInSelectedCity);
        } else {
            setDistricts([]);
            setWards([]);
        }
        setSelectedDistrict("");
        setSelectedWard("");
    }, [selectedCity, cities]);

    useEffect(() => {
        if (selectedDistrict !== "") {
            const wardsInSelectedDistrict = districts.find(
                (district) => district.Id === selectedDistrict
            ).Wards;
            setWards(wardsInSelectedDistrict);
        } else {
            setWards([]);
        }
        setSelectedWard("");
    }, [selectedDistrict, districts]);

    return (
        <>
            <div className='col-lg-4 col-md-12'>
                <label className="text-small text-uppercase" htmlFor="Tỉnh thành">Tỉnh thành: </label>
                <select
                    className="form-select form-select-sm mb-3 form-control-lg"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                >
                    <option value="">Chọn tỉnh thành</option>
                    {cities.map((city) => (
                        <option key={city.Id} value={city.Id}>
                            {city.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='col-lg-4 col-md-12'>
                <label className="text-small text-uppercase" htmlFor="Quận huyện">Quận huyện: </label>
                <select
                    className="form-select form-select-sm mb-3 form-control-lg"
                    value={selectedDistrict}
                    onChange={(event) => setSelectedDistrict(event.target.value)}
                    disabled={!selectedCity}
                >
                    <option value="">Chọn quận huyện</option>
                    {districts.map((district) => (
                        <option key={district.Id} value={district.Id}>
                            {district.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='col-lg-4 col-md-12 mb-3'>
                <label className="text-small text-uppercase" htmlFor="Phường xã">Phường xã: </label>
                <select
                    className="form-select form-select-sm form-control-lg"
                    value={selectedWard}
                    onChange={(event) => setSelectedWard(event.target.value)}
                    disabled={!selectedDistrict}
                >
                    <option value="">Chọn phường xã</option>
                    {wards.map((ward) => (
                        <option key={ward.Id} value={ward.Id}>
                            {ward.Name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default SelectionForm;
