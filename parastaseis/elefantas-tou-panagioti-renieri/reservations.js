import "https://unpkg.com/axios/dist/axios.min.js";

export default {
  props: [
    'dates'
  ],
  data() {
    return {
      date: null,
      persons: 0,
      name: '',
      email: '',
      phone: '',
      comments: '',
      error: null,
    }
  },
  methods: {
    async submit() {
      this.error = null;
      try {
        await axios.post("/api/reservation.php",
          {
            date: this.date,
            persons: this.persons,
            name: this.name,
            email: this.email,
            phone: this.phone,
            comments: this.comments,
          }
        );
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  template: `
    <div class="reservation-header">
        Πραγματοποιήστε κράτηση
    </div>
    <div class="reservation-fields">
        <div class="reservation-dates">
            <div class="reservation-date" v-for="availableDate in dates" :key="availableDate" @click="date=availableDate" :class="{selected: date == availableDate}">
                {{availableDate}}
            </div>
        </div>
        <div class="reservation-persons">
            <label>Αριθμός Θέσεων</label>
            <input type="number" v-model="persons" min="0">
        </div>
        <div class="reservation-name">
            <label>Όνομα</label>
            <input v-model="name">
        </div>
        <div class="reservation-email">
            <label>Email</label>
            <input v-model="email" type="email">
        </div>
        <div class="reservation-phone">
            <label>Phone</label>
            <input v-model="phone">
        </div>
        <div class="reservation-comments">
            <label>Σχόλια</label>
            <textarea v-model="comments"></textarea>
        </div>
    </div>
    <div class="reservation-actions">
        <button class="Submit" @click="submit">Υποβολή</button>
    </div>
  `
}
