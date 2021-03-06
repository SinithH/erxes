import dayjs from 'dayjs';
import { __ } from 'modules/common/utils';
import { GENDER_TYPES, LEAD_STATUS_TYPES } from 'modules/customers/constants';
import { ICustomer } from 'modules/customers/types';
import {
  FieldStyle,
  SidebarCounter,
  SidebarFlexRow,
  SidebarList
} from 'modules/layout/styles';
import React from 'react';

type Props = {
  customer: ICustomer;
  hasPosition?: boolean;
};

class DetailInfo extends React.PureComponent<Props> {
  renderRow(label, value) {
    return (
      <li>
        <FieldStyle>{__(`${label}`)}:</FieldStyle>
        <SidebarCounter fullLength={label === 'Description'}>
          {value || '-'}
        </SidebarCounter>
      </li>
    );
  }

  renderPosition(customer) {
    if (!this.props.hasPosition) {
      return null;
    }

    return (
      <React.Fragment>
        {this.renderRow('Position', customer.position)}
      </React.Fragment>
    );
  }

  render() {
    const { customer } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('Code', customer.code)}
        {this.renderRow('Primary email', customer.primaryEmail)}
        {this.renderRow('Primary email status', customer.emailValidationStatus)}
        {this.renderRow('Primary phone', customer.primaryPhone)}
        {this.renderPosition(customer)}
        {this.renderRow(
          'Owner',
          customer.owner && customer.owner.details
            ? customer.owner.details.fullName
            : ''
        )}
        {this.renderRow('Department', customer.department)}
        {this.renderRow(
          'Pop Ups Status',
          LEAD_STATUS_TYPES[customer.leadStatus || '']
        )}
        {this.renderRow('Gender', GENDER_TYPES[customer.sex])}
        {this.renderRow(
          'Birthday',
          customer.birthDate && dayjs(customer.birthDate).format('MMM,DD YYYY')
        )}
        {this.renderRow('Do not disturb', customer.doNotDisturb)}
        <SidebarFlexRow>
          {__(`Description`)}:<span>{customer.description || '-'}</span>
        </SidebarFlexRow>
      </SidebarList>
    );
  }
}

export default DetailInfo;
