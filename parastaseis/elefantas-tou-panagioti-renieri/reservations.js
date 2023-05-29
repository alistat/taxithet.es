import "https://unpkg.com/axios/dist/axios.min.js";

export default {
  props: [
    'dates'
  ],
  data() {
    return {
      date: null,
      persons: 1,
      name: '',
      email: '',
      phone: '',
      comments: '',
      error: null,
      nameTouched: false,
      emailTouched: false,
      loading: false,
      success: false,
    }
  },
  computed: {
    dateOk() {
      return this.date !== null;
    },
    nameOk() {
      return !/^\s*$/.test(this.name);
    },
    emailOk() {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email);
    },
    phoneOk() {
      return /^\s*$/.test(this.phone)
       || /^\d{10}$/.test(this.phone);
    },
    valid() {
      return this.dateOk && this.nameOk && this.emailOk && this.phoneOk;
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = null;
      try {
        let captchaToken;
        try {
          captchaToken = await grecaptcha.enterprise.execute('6Lc1_zQmAAAAAJweybnwFAFLgBaxUBUH11lZ-AQQ', {action: 'reservation'});
        } catch (error) {
          console.error("Could not get captcha token", error);
        }
        const resp = await axios.post("/api/res" + "ervation.php",
          {
            date: this.date.date,
            persons: this.persons,
            name: this.name.trim(),
            email: this.email.trim(),
            phone: this.phone,
            comments: this.comments.trim(),
            captchaToken
          }
        );
        console.log(resp);
        if (resp.data.success) {
          this.success = true;
        } else {
          this.error = "Συνέβη κάποιο σφάλμα, προσπαθήστε ξανά. ";
          if (resp.data.error) this.error += resp.data.error;
        }
      } catch (error) {
        this.error = error.message;
      }
      this.loading = false;
    }
  },
  template: `
    <div class="reservation-fields" :class="{ loading, success, valid }" v-if="!success">
        <div class="reservation-field reservation-dates reservation-field-full">
            <label>Ημερομηνία*</label>
            <div class="reservation-dates-values">
                <div class="reservation-date"
                  v-for="availableDate in dates" 
                  :key="availableDate"
                  @click="!success && ! availableDate.soldOut && (date=availableDate)"
                  :class="{ selected: date == availableDate, soldOut: availableDate.soldOut }">
                    <div class="reservation-date-day">{{availableDate.day}}</div>
                    <div class="reservation-date-date">{{availableDate.date}}</div>
                    <div class="reservation-date-sold-out" v-if="availableDate.soldOut">Sold Out</div>
                </div>
            </div>
        </div>
        <div class="reservation-field reservation-name" :class="{invalid: nameTouched && !nameOk}">
            <label>Όνομα*</label>
            <input v-model="name" placeholder="το όνομά σας" @input="nameTouched = true" :disabled="success">
        </div>
        <div class="reservation-field reservation-persons">
            <label>Θέσεις</label>
            <div class="reservation-persons-input">
              <button class="reservation-persons-minus reservation-persons-control" @click="persons--" :disabled="persons<=1 || success">-</button>
              <span class="reservation-persons-value">{{persons}}</span>
              <button class="reservation-persons-plus reservation-persons-control"  @click="persons++" :disabled="success">+</button>
            </div>
        </div>
        <div class="reservation-field reservation-email" :class="{invalid: emailTouched && !emailOk}">
            <label>Email*</label>
            <input v-model="email" type="email" placeholder="ένα έγκυρο email" @input="emailTouched = true" :disabled="success">
        </div>
        <div class="reservation-field reservation-phone" :class="{invalid: !phoneOk}">
            <label>Τηλέφωνο</label>
            <input v-model="phone" placeholder="το τηλέφωνό σας" :disabled="success">
        </div>
        <div class="reservation-field reservation-comments reservation-field-full">
            <label>Σχόλια</label>
            <textarea v-model="comments" placeholder="Οτιδήποτε θα ήταν καλό να ξέρουμε" :disabled="success"></textarea>
        </div>
    </div>
    <div class="reservation-control" :class="{ error, success, valid }">
      <div class="reservation-error" v-if="error">{{error}}</div>
      <div class="reservation-success" v-if="success">
        <div class="reservation-success-message">
            Επιτυχία! Λάβαμε την κράτησή σας.
        </div>
        <div class="reservation-success-info">
            <table>
<!--                <thead>-->
<!--                    <tr><th colspan="2">Πληροφορίες Κράτησης</th></tr>-->
<!--                </thead>-->
                <tbody>
                    <tr>
                        <th>Ημερομηνία</th>
                        <td><strong>{{date.day}} {{date.date}}</strong></td>
                    </tr>
                    <tr>
                        <th>Όνομα</th>
                        <td>{{name}}</td>
                    </tr>
                    <tr>
                        <th>Θέσεις</th>
                        <td>{{persons}}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{email}}</td>
                    </tr>
                    <tr>
                        <th>Τηλέφωνο</th>
                        <td>{{phone}}</td>
                    </tr>
                    <tr>
                        <th>Σχόλια</th>
                        <td>{{comments}}</td>
                    </tr>
                </tbody>
          </table>
          <div class="reservation-success-email-notice">Σας έχουμε στείλει ένα αντίγραφο στο email σας.</div>
        </div>
      </div>
      <div class="reservation-validation" v-if="!success">Τα πεδία με <strong>*</strong> είναι υποχρεωτικά.</div>
      <div class="reservation-actions" v-if="!success">
          <button class="submit" @click="submit" :disabled="loading || !dateOk || !nameOk || !emailOk || !phoneOk">Υποβολη Κρατησης</button>
      </div>
    </div>
  `
}
