import React from 'react';
import PropTypes from 'prop-types';

SortProduct.propTypes = {
    handlerChangeSort: PropTypes.func
};

SortProduct.defaultProps = {
    handlerChangeSort: null
}

function SortProduct(props) {

    const { handlerChangeSort } = props

    const onChangeValue = (e) => {

        const keyword = e.target.value
        if (!handlerChangeSort) {
            return
        }

        handlerChangeSort(keyword)

    }

    return (
        <select className="selectpicker ml-auto" onChange={onChangeValue}>
            <option value="default">Sắp xếp mặc định</option>
            <option value="DownToUp">Giá: Thấp đến cao</option>
            <option value="UpToDown">Giá: Cao đến thấp</option>
        </select>
    );
}

export default SortProduct;